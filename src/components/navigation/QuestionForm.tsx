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

type Schema = z.infer<typeof formSchema>;

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
            name="input-a84"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field
                data-invalid={fieldState.invalid}
                className="gap-1 col-span-full"
              >
                <FieldLabel htmlFor="input-a84">Input Field </FieldLabel>
                <Input
                  {...field}
                  id="input-a84"
                  type="text"
                  onChange={(e) => {
                    field.onChange(e.target.value);
                  }}
                  aria-invalid={fieldState.invalid}
                  placeholder="Enter your text"
                />

                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
        </FieldGroup>
      </form>
    </div>
  );
};

export default QuestionForm;
