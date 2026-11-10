
import { Button } from '@base-ui/react';
import { Textarea } from "@/components/ui/textarea";
import React, { useContext, useEffect, useState } from 'react';
import { ResumeInfoContext } from '@/context/ResumeInfoContext';
import { useParams } from 'react-router-dom';
import GlobalApi from '../../../../../service/GlobalApi';
import { Brain, LoaderCircle } from 'lucide-react';
import { toast } from 'sonner';
import { generateResponse } from '../../../../../service/AIModal';

function Summery({ enabledNext }) {

  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);

  const [summery, setSummery] = useState(resumeInfo?.summery || '');
  const [loading, setLoading] = useState(false);

  const params = useParams();

  useEffect(() => {
    setResumeInfo(prev => ({
      ...prev,
      summery: summery
    }));
  }, [summery, setResumeInfo]);

  // Generate Summary using AI
  const GenerateSummeryFromAI = async () => {

    if (!resumeInfo?.jobTitle) {
      toast.error("Please enter Job Title first");
      return;
    }

    try {
      setLoading(true);

      const PROMPT = `
        Job Title: ${resumeInfo?.jobTitle}

        Generate a professional resume summary for this job role.
        Requirements:
        - Write only 4-5 lines.
        - Use professional language.
        - Include relevant skills and strengths.
        - Make it ATS-friendly.
        - Do not add any heading.
        - Do not use first person.
      `;

      const result = await generateResponse(PROMPT);

      setSummery(result);

      toast.success("AI Summary Generated Successfully!");

    } catch (error) {
      console.error("AI Generation Error:", error);
      toast.error("Failed to generate summary");

    } finally {
      setLoading(false);
    }
  };

  // Save Summary
  const onSave = async (e) => {

    e.preventDefault();

    try {
      setLoading(true);

      const data = {
        data: {
          summery: summery
        }
      };

      await GlobalApi.UpdateResumeDetail(params?.resumeId, data);

      enabledNext(true);

      toast.success("Details updated successfully");

    } catch (error) {
      console.error("Save Error:", error);
      toast.error("Failed to update details");

    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className='p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10'>

        <h2 className='font-bold text-lg'>Summary Detail</h2>
        <p>Add Summary for your job title</p>

        <form className='mt-7' onSubmit={onSave}>

          <div className='flex justify-between items-end'>

            <label>Add Summary</label>

            <Button
              onClick={GenerateSummeryFromAI}
              type='button'
              disabled={loading}
              variant="outline"
              size="sm"
              className="bg-white text-purple-700 border border-purple-400 rounded-md px-4 py-2 hover:bg-purple-50 flex gap-2"
            >
              {loading ? (
                <LoaderCircle className='h-5 w-5 animate-spin' />
              ) : (
                <Brain className='h-5 w-5' />
              )}

              Generate from AI
            </Button>

          </div>

          <Textarea
            required
            className="mt-5"
            value={summery}
            onChange={(e) => setSummery(e.target.value)}
            placeholder="Write your professional summary here..."
          />

          <div className='mt-2 flex justify-end'>

            <Button
              disabled={loading}
              type='submit'
              className="bg-purple-600 text-white rounded-md px-4 py-2 hover:bg-purple-700"
            >
              {loading ? (
                <LoaderCircle className='animate-spin' />
              ) : (
                'Save'
              )}
            </Button>

          </div>

        </form>
      </div>
    </div>
  );
}

export default Summery;
