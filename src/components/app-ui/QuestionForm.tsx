"use client";
import React from "react";
import * as z from "zod";
import { formSchema } from "@/lib/form-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";
import { motion } from "motion/react";
import { Check } from "lucide-react";
import {
  Field,
  FieldGroup,
  FieldContent,
  FieldLabel,
  FieldDescription,
  FieldError,
  FieldSeparator,
} from "@/components/ui/field";
import { Button } from "@/components/ui/button";
import Input from "@/components/ui/input";

import { Textarea } from "@/components/ui/textarea";
import type {
  ControllerFieldState,
  ControllerRenderProps,
} from "react-hook-form";

import dynamic from "next/dynamic";
import { Suspense } from "react";
type Schema = z.infer<typeof formSchema>;

const EditorComp = dynamic(() => import("./Editor"), { ssr: false });

const QuestionForm = () => {
  const form = useForm<Schema>({
    resolver: zodResolver(formSchema as any),
  });
  const {
    formState: { isSubmitting, isSubmitSuccessful },
  } = form;
  const handleSubmit = form.handleSubmit(async (data: Schema) => {
    try {
      // TODO: implement form submission
      console.log(data);
      form.reset();
    } catch (error) {
      // TODO: handle error
    }
  });
  return (
    <div>
      <h3 className="font-semibold">Write a question</h3>
      <form onSubmit={handleSubmit} className="w-full gap-2 my-4">
        <FieldGroup className="grid md:grid-cols-6 gap-4 mb-6">
          <Controller
            name="title"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field
                data-invalid={fieldState.invalid}
                className="gap-1 col-span-full"
              >
                <FieldLabel htmlFor="input-a84">Title</FieldLabel>
                <FieldDescription>
                  Keep it clean and to the point
                </FieldDescription>
                <Input
                  {...field}
                  id="title"
                  type="text"
                  onChange={(e) => {
                    field.onChange(e.target.value);
                  }}
                  aria-invalid={fieldState.invalid}
                  placeholder="Title of your question"
                />

                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
        </FieldGroup>
        <FieldGroup className="grid md:grid-cols-6 gap-4 mb-6">
          <Controller
            name="body"
            control={form.control}
            render={() => (
              <Field className="gap-1 col-span-full">
                <FieldLabel htmlFor="input-a84">Title</FieldLabel>
                <FieldDescription>
                  Keep it clean and to the point
                </FieldDescription>
                <Suspense fallback={null}>
                  <EditorComp
                    markdown={`
Hello **world**!
`}
                  />
                </Suspense>
              </Field>
            )}
          />
        </FieldGroup>
        <div className="flex justify-end items-center w-full">
          <Button disabled={isSubmitting}>
            {isSubmitting ? "Submitting..." : "Submit"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default QuestionForm;
