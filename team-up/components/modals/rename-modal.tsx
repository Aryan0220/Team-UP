"use client";

import {
    Dialog,
    DialogContent,
    DialogTrigger,
    DialogTitle,
    DialogHeader,
    DialogDescription,
    DialogClose,
    DialogFooter,
} from "@/components/ui/dialog";
import { useRenameModel } from "@/store/use-rename-model";
import { FormEventHandler, useEffect, useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useApiMutation } from "@/hooks/use-api-mutations";
import { api } from "@/convex/_generated/api";
import { toast } from "sonner";

export const RenameModel = () => {
    const { mutate, pending } = useApiMutation(api.board.update);
    const {
        isOpen,
        onClose,
        initialValues,
    } = useRenameModel((state) => state);

    const [title, setTitle] = useState(initialValues.title);
    useEffect(() => {
        setTitle(initialValues.title);
    }, [initialValues.title]);

const onSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    mutate({
        id: initialValues.id,
        title,
    })
    .then(() => {
        toast.success("Board Renamed");
        onClose();
    })
    .catch(() => toast.error("Failed to rename board"));
}

    return(
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        Edit Board title
                    </DialogTitle>
                </DialogHeader>
                <DialogDescription>
                    Enter a new title for this Board
                </DialogDescription>
                <form onSubmit={onSubmit} className="space-y-4">
                    <Input
                    disabled={pending}
                    required
                    maxLength={60}
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Board Title"
                    />
                    <div className="flex justify-end gap-2">
                        <DialogClose asChild>
                            <Button type="button" variant="outline">
                                Cancel
                            </Button>
                        </DialogClose>
                        <Button disabled={pending} type="submit">
                            Save
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    )
}