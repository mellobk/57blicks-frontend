import { Button } from "@/components/ui/Button";
import type { FC } from "react";

import type { Ticket } from "@/features/admin/components/servicing/types/api";

interface CloseTicketProps {
    body?: Ticket;
    handleCloseTicket?: (id: Ticket) => void;
}

export const CloseTicket: FC<CloseTicketProps> = ({
    body,
    handleCloseTicket,
}) => {
    const handleButtonClick = (): void => {
        if (body && handleCloseTicket) {
            handleCloseTicket(body);
        }
    };

    return (
        <div className="flex flex-col justify-between w-full h-full gap-10 mt-9">
            <div className="flex items-center gap-2 justify-center">
                Are you sure you want to
                <div className="font-bold text-red-500">close</div> this ticket?
            </div>
            <Button
                buttonText="Close"
                className="bg-primary-500"
                onClick={handleButtonClick}
            />
        </div>
    );
};
