
import React from "react";

function ExperiencePreview({ resumeInfo }) {

    const experienceList = resumeInfo?.Experience || [];

    return (
        <div className="my-6">

            {/* Heading */}
            <h2
                className="text-center font-bold text-sm mb-2"
                style={{
                    color: resumeInfo?.themeColor,
                }}
            >
                Professional Experience
            </h2>

            <hr
                style={{
                    borderColor: resumeInfo?.themeColor,
                }}
            />

            {/* Experience List */}
            {experienceList.map((experience, index) => {

                const isCurrentlyWorking =
                    experience?.currentlyWorking === true ||
                    experience?.currentlyWorking === "true" ||
                    !experience?.endDate;

                return (
                    <div key={index} className="my-5">

                        {/* Job Title */}
                        <h2
                            className="text-sm font-bold"
                            style={{
                                color: resumeInfo?.themeColor,
                            }}
                        >
                            {experience?.title}
                        </h2>

                        {/* Company and Dates */}
                        <div className="text-xs flex justify-between gap-2">

                            <span>
                                {experience?.companyName}
                                {experience?.city && `, ${experience.city}`}
                                {experience?.state && `, ${experience.state}`}
                            </span>

                            <span className="whitespace-nowrap">
                                {experience?.startDate
                                    ? new Date(experience.startDate).toLocaleDateString(
                                        "en-US",
                                        { month: "short", year: "numeric" }
                                    )
                                    : ""
                                }

                                {" To "}

                                {isCurrentlyWorking
                                    ? "Present"
                                    : new Date(experience.endDate).toLocaleDateString(
                                        "en-US",
                                        { month: "short", year: "numeric" }
                                    )
                                }
                            </span>

                        </div>

                        {/* Work Summary */}
                        <div
                            className="
                                text-xs
                                my-2
                                [&_ul]:list-disc
                                [&_ul]:ml-5
                                [&_ul]:pl-1
                                [&_ol]:list-decimal
                                [&_ol]:ml-5
                                [&_li]:mb-1
                            "
                            dangerouslySetInnerHTML={{
                                __html: experience?.workSummery || "",
                            }}
                        />

                    </div>
                );
            })}

        </div>
    );
}

export default ExperiencePreview;
