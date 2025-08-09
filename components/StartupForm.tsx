"use client";

import { useActionState, useState } from "react";
import MDEditor from "@uiw/react-md-editor";
import { Send } from "lucide-react";
import { formSchema } from "@/sanity/lib/validation";
import { useRouter } from "next/navigation";
import { createPitch } from "@/sanity/lib/actions";

const StartupForm = () => {
    const[errors, setErrors] = useState<Record<string, string>>({});
    const[pitch, setPitch] = useState("");

    const router = useRouter();

    const handleFormSubmit = async (prevState: any, formData: FormData) => {
        try {
            const formValues = {
                title: formData.get("title") as string,
                description: formData.get("description") as string,
                category: formData.get("category") as string,
                link: formData.get("link") as string,
                pitch
            }

            const result = await formSchema.safeParseAsync(formValues);

            if (!result.success) {
            const fieldErrors: Record<string, string> = {};

            result.error.errors.forEach((err) => {
                if (err.path.length > 0) {
                const field = err.path[0] as string;
                fieldErrors[field] = err.message;
                }
            });

            setErrors(fieldErrors);
            return;
            }


            const formInfo = await createPitch(prevState, formData, pitch);

            // fix with real alert
            if (formInfo.status === "SUCCESS") {
                window.prompt("Startup has succesfully been created")

                router.push(`/startup/${formInfo._id}`)
            }
            
            return formInfo;
        } catch (error) {
            return {
                ...prevState, error: "An unexpected error occured", status: "ERROR"
            }
        }
    }

    const [state, formAction, isPending] = useActionState(handleFormSubmit, {error: '', status: "INITIAL"});

    return (
        <form action={formAction} className="startup-form">
            <div>
                <label htmlFor="title" className="startup-form_label">Title: </label>
                <input type="text" id="title" name="title" className="startup-form_input" placeholder="Startup Title" required/>
                {errors.title && 
                    <p className="startup-form_error">{errors.title}</p>
                }
            </div>

            <div>
                <label htmlFor="description" className="startup-form_label">Startup Description</label>
                <textarea id="description" name="description" className="startup-form_textarea" placeholder="Description" required/>
                {errors.description && 
                    <p className="startup-form_error">{errors.description}</p>
                }
            </div>

            <div>
                <label htmlFor="category" className="startup-form_label">Category</label>
                <input type="text"
                id="category" name="category" className="startup-form_input" 
                placeholder="Startup category(Tech, health, Education...)" required
                />
                {errors.category && 
                    <p className="startup-form_error">{errors.category}</p>
                }
            </div>
            <div>
                <label htmlFor="link" className="startup-form_label">Image URL </label>
                <input type="text" id="link" name="link" className="startup-form_input" placeholder="Startup Image URL" required/>
                {errors.link && 
                    <p className="startup-form_error">{errors.link}</p>
                }
            </div>
            <div data-color-mode="light">
                <label htmlFor="pitch" className="startup-form_label">Pitch </label>
                <MDEditor
                    value={pitch}
                    onChange={(value) => setPitch(value as string)}
                    id="pitch"
                    preview="edit"
                    height={300}
                    style={{borderRadius: 20, overflow: "hidden"}}
                    textareaProps={{
                        placeholder:"Briefly describe your startup ideaand what problem does it solve?"
                    }}
                    previewOptions={{
                        disallowedElements: ["style"],
                    }}
                />
                {errors.pitch && 
                    <p className="startup-form_error">{errors.pitch}</p>
                }
            </div>
            <button type="submit" className="startup-form_btn text-white" disabled={isPending}>
                {isPending ? "Submitting..." : "Submit your pitch"}
                <Send className="size-6 ml-2" />
            </button>
        </form>
    );
}
 
export default StartupForm;