
import React, { useEffect, useState } from "react";

import {
    BtnBold,
    BtnItalic,
    BtnUnderline,
    BtnBulletList,
    BtnNumberedList,
    BtnLink,
    BtnClearFormatting,
    Editor,
    EditorProvider,
    Toolbar,
} from "react-simple-wysiwyg";

import { Button } from "@/components/ui/button";
import { Brain, LoaderCircle } from "lucide-react";
import { generateResponse } from "../../../../service/AIModal";

function RichTextEditor({
    defaultValue = "",
    onRichTextEditorChange,
}) {
    const [value, setValue] = useState(defaultValue || "");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setValue(defaultValue || "");
    }, [defaultValue]);

    const handleChange = (event) => {
        const newValue = event.target.value;

        setValue(newValue);

        onRichTextEditorChange?.({
            target: {
                value: newValue,
            },
        });
    };

    const GenerateSummaryFromAI = async () => {
        try {
            setLoading(true);

            const prompt = `
Generate 5-7 professional resume experience bullet points.

Rules:
1. Return valid HTML only.
2. Use <ul> and <li> tags.
3. Each point must be inside a separate <li> tag.
4. Start each point with a strong action verb.
5. Use professional resume language.
6. Do not use Markdown.
7. Do not include any heading or explanation.

Example:
<ul>
<li>Designed and developed scalable applications using Java and Spring Boot.</li>
<li>Implemented RESTful APIs for seamless data integration.</li>
<li>Improved application performance and code quality.</li>
</ul>
`;

            const response = await generateResponse(prompt);

            if (!response) {
                throw new Error("Empty AI response");
            }

            const cleanResponse = response
                .replace(/```html/gi, "")
                .replace(/```/g, "")
                .trim();

            setValue(cleanResponse);

            onRichTextEditorChange?.({
                target: {
                    value: cleanResponse,
                },
            });

        } catch (error) {
            console.error("AI Generation Error:", error);
            alert("AI generation failed. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-full">

            <div className="flex justify-end mb-2">
                <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    disabled={loading}
                    onClick={GenerateSummaryFromAI}
                    className="flex gap-2"
                >
                    {loading ? (
                        <>
                            <LoaderCircle className="h-4 w-4 animate-spin" />
                            Generating...
                        </>
                    ) : (
                        <>
                            <Brain className="h-4 w-4" />
                            Generate with AI
                        </>
                    )}
                </Button>
            </div>

            <div className="border rounded-md overflow-hidden">

                <EditorProvider>
                    <Editor
                        value={value}
                        onChange={handleChange}
                        containerProps={{
                            style: {
                                minHeight: "180px",
                                fontSize: "14px",
                            },
                        }}
                    >
                        <Toolbar>
                            <BtnBold />
                            <BtnItalic />
                            <BtnUnderline />
                            <BtnBulletList />
                            <BtnNumberedList />
                            <BtnLink />
                            <BtnClearFormatting />
                        </Toolbar>
                    </Editor>
                </EditorProvider>

            </div>

        </div>
    );
}

export default RichTextEditor;
