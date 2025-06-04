import {
    Dialog,
    IconButton,
    DialogBody,
    DialogHeader,
    Typography,
    Button,
    DialogFooter
} from "@material-tailwind/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { ButtonTab } from "./ButtonTab";

export function Modal({ open, setOpen, children, footer, togglePolicies, header }) {
    const handleOpen = () =>
        setOpen(!open);

    return (

        <Dialog open={open} handler={handleOpen} className="bg-white overflow-y-scroll max-h-[800px]">
            {header ? (
                <DialogHeader className="justify-between border-b border-blue-gray-100">
                    <Typography
                        variant="h4"
                        color="blue-gray"
                        className="text-[1.8rem] text-center px-2 mx-auto text-[#2A3F77] border border-[#caa55e] rounded-md"
                    >
                        Términos y condiciones
                    </Typography>
                    <Button onClick={handleOpen} variant="text" color="blue-gray" className="p-2">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={2}
                            stroke="currentColor"
                            className="h-5 w-5"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </Button>
                </DialogHeader>
            ) : (
                <DialogHeader className="relative m-0 block">
                    <IconButton
                        size="sm"
                        variant="text"
                        className="!absolute right-3.5 top-3.5"
                        onClick={handleOpen}
                    >
                        <XMarkIcon className="h-4 w-4 stroke-2" />
                    </IconButton>
                </DialogHeader>
            )}

            <DialogBody className="space-y-4 pb-6">
                {children}
            </DialogBody>
            {
                footer && (
                    <DialogFooter className="justify-center">
                        <ButtonTab
                            onClick={togglePolicies}
                            text={'Aceptar'}
                        />
                    </DialogFooter>
                )
            }
        </Dialog>

    );
}
