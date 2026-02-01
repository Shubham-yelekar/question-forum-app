import * as z from "zod";

export interface ActionResponse<T = any> {
  success: boolean;
  message: string;
  errors?: {
    [K in keyof T]?: string[];
  };
  inputs?: T;
}
export const formSchema = z.object({
  "input-a84": z.string({ error: "This field is required" }).optional(),
  "textarea-247": z.string({ error: "This field is required" }).optional(),
  //   "fileupload-fa6": z
  //     .union([
  //       z.file().mime(["image/png", "image/jpeg", "image/gif"]).max(5242880),
  //       z
  //         .array(
  //           z.file().mime(["image/png", "image/jpeg", "image/gif"]).max(5242880),
  //         )
  //         .nonempty({ message: "Please select a file" }),
  //       z.string().min(1, "Please select a file"),
  //       z.instanceof(FileList),
  //     ])
  //     .optional(),
  //   "taginput-902": z
  //     .array(
  //       z.object({
  //         id: z.string(),
  //         text: z.string(),
  //       }),
  //       { error: "Please enter at least one tag" },
  //     )
  //     .min(1, "Please enter at least one tag")
  //     .optional(),
});
