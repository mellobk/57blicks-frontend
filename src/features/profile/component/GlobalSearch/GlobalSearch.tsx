/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable unicorn/consistent-function-scoping */
import { Input } from "@/components/forms/Input";
import { Icon } from "@/components/ui/Icon";
import { useQuery } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import type { FC } from "react";


import { getLabel } from "@/utils/common-funtions";
import { useDebounce } from "@/hooks/debounce";

import { useNavigate } from "@tanstack/router";
import manageUserStore from "@/features/manage-user/stores/manage-user-store";
import ManagePermissionGroupService from "@/features/admin/components/profile/api/permission";
import type { User } from "@/features/admin/components/manage-user/types/api";


interface GlobalSearchProps {
  handleOpenGlobalSearch?: () => void;
  loading?: boolean;
}


export const GlobalSearch: FC<GlobalSearchProps> = ({ handleOpenGlobalSearch }) => {
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState<string>("")
  const debouncedSearchTerm = useDebounce(searchValue, 1500);

  const setUserInfo = manageUserStore((state) => state.setUserInfo);


  const globalSearchQuery = useQuery(
    ["global-search-query"],
    () => {
      return ManagePermissionGroupService.getGlobalSearchData(searchValue || "");
    },
    { enabled: true, staleTime: 1000 * 60 * 60 * 24 }
  );


  useEffect(() => {

    if (debouncedSearchTerm.length >= 4) {
      void globalSearchQuery.refetch()
    } else if (debouncedSearchTerm === "") {
      void globalSearchQuery.refetch()
    }
  }, [debouncedSearchTerm]);


  const getPluralRole = (roleName: string) => {
  switch(roleName) {
    case 'admin': {
      return 'admins';
    }
    case 'investor': {
      return 'investors';
    }
    // For 'accounting', we return it as is.
    case 'accounting': {
      return 'accounting';
    }
    default: {
      return roleName;
    } // or handle any other default case
  }
}


  const navigateUser = (data: User): void => {

    void navigate({ to: `/manage-users/${getPluralRole(data.role?.name || "")}`});

    setUserInfo(data)

    if(handleOpenGlobalSearch){
      handleOpenGlobalSearch()
    }
  }

  return (
    <div style={{ backdropFilter: " blur(5px)" }} className="w-full h-full absolute z-30 ">
      <div
        style={{ backdropFilter: " blur(5px)" }}
        className="w-full h-full absolute z-30 "
        onClick={handleOpenGlobalSearch}
      ></div>
      <div
        className="absolute rounded-3xl bg-white flex flex-col  opacity-80"
        style={{
          width: "70%",
          right: "0",
          top: "0",
          left: "0",
          bottom: "0",
          margin: "auto",
          zIndex: "100",
          height: "70vh"
        }}
      >
        <div className="h-full w-full rounded-3xl bg-gray-1800 flex flex-col justify-between ">
          <div className="h-[50px] flex items-center w-full gap-4 bg-gray-1700  p-[20px] rounded-t-3xl ">
            <Icon name="search" width="20" />
            <div className="w-full">
              <Input placeholder="Search for loans, investors, or invoices" className="h-[30px] w-[100%] focus:outline-none shadow-none bg-transparent"
                iconName="close"
                iconColor="black"
                iconWidth="12"
                clickIcon={handleOpenGlobalSearch}
                onChange={(data) => { setSearchValue(data.target.value); }}
              />
            </div>
          </div>


          <div className="h-full w-full p-[20px] overflow-auto justify-start">
           {globalSearchQuery.isLoading? <div className="w-full h-full flex justify-center items-center"><Icon name="loading" width="34"/></div>:
            <div className="flex flex-col gap-2 justify-center">
              <div className="text-gray-2000 font-bold">Users</div>
              {globalSearchQuery.data?.users?.map((userData: User) => {
                return <div key={userData.id} className="flex gap-3 items-center px-[5px] cursor-pointer" onClick={(): void => { navigateUser(userData); }}>
                  <div className="w-[30px] h-[30px] flex items-center justify-center bg-blue-300 rounded-full ">
                    <div className="text-white text-[12px]">
                      {getLabel(`${userData.firstName} ${userData.lastName}`)}
                    </div>
                  </div>
                  <div className="text-black font-bold">{`${userData.firstName} ${userData.lastName}`}</div> <div className="text-gray-1900">{userData.email}</div></div>
              })}
              <div className="border-t border-gray-1900 mt-3 opacity-20"></div>
            </div>}
          </div>
          <div className="h-[50px] flex items-center  justify-between w-full gap-4 bg-gray-1700  p-[20px] rounded-b-3xl">
            <div className="flex gap-2">
              <div className="text-gray-1900 font-bold">CTRL + F</div> <div className="text-black">Close Search</div>
            </div>
            <div className="flex gap-2">
              <div className="text-gray-1900 font-bold">CTRL + F</div> <div className="text-black">Open Search</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
