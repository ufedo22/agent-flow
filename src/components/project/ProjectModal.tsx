"use client"

import { Label } from "@radix-ui/react-label"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import React from "react";
import { Textarea } from "../ui/textarea";
import { BaseModal } from "../general/BaseModal";
import { z } from "zod"
import { Loader2 } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form"
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@//store";
import { toggleModal } from "@//store/ProjectSlice";
import { makeHttpReq } from "@//helper/makehttpReq";
import { showError, showSuccess } from "@//lib/utils";

const formSchema = z.object({
    name: z
    .string()
    .min(5, "Text must be at least 5 characters")
    .max(50, "Text is too long"),
})

type formSchemaType = z.infer<typeof formSchema>;

export const ProjectModal = ({session}:{user?:{id?: string | null, email?: string | null}}) => {
    

    const dispatch = useDispatch<AppDispatch>();
    const { modal } = useSelector((state: RootState) => state.project)

    const { register, handleSubmit, reset, formState:{errors, isSubmitting}, } = useForm<formSchemaType>({
        resolver:zodResolver(formSchema),
    })

    const onSubmit = async (data: formSchemaType) => {
       try {
        const res = await makeHttpReq<{name: string, userId: string}>
        ("POST", "projects", { userId: session?.user?.id,  name: data?.name})
        reset()
        showSuccess(res?.message)

       } catch (error) {
        showError(error?.message)
       }
    }
    return (
      <BaseModal
        open={modal}
        onOpenChange={() => dispatch(toggleModal())}
        title="Create Project"
        description=""
        width={500}
        height={200}
        footer={<></>}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid gap-3 p-3 mb-4">
            <Input
              {...register("name")}
              className="placeholder:text-xs"
              id="name-1"
              name="name"
            />
            {errors.name && (
              <p className="text-red-500 text-xs">{errors.name.message}</p>
            )}
          </div>
          <div className="flex justify-between">
            <div></div>
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => dispatch(toggleModal())}>
                Cancel
              </Button>
              <Button
                className="cursor-pointer"
                type="submit"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  "Submit"
                )}
              </Button>
            </div>
          </div>
        </form>
      </BaseModal>
    );
}