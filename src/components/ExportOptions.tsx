
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { Download, FileText, File, Globe } from "lucide-react";
import { toast } from "sonner";
import { exportToPDF, exportToDOCX, exportToHTML } from '../utils/exportUtils';
import { FeedbackModal } from './FeedbackModal';

interface ExportOptionsProps {
  resumeData: any;
}

export const ExportOptions = ({ resumeData }: ExportOptionsProps) => {
  const [showFeedback, setShowFeedback] = useState(false);

  const handleExport = async (exportFunction: (data: any) => Promise<boolean>, format: string) => {
    try {
      const success = await exportFunction(resumeData);
      if (success) {
        toast.success(`Resume exported as ${format} successfully!`);
        // Show feedback modal after successful export
        setTimeout(() => setShowFeedback(true), 1000);
      } else {
        toast.error(`Failed to export resume as ${format}`);
      }
    } catch (error) {
      toast.error(`Export failed: ${error}`);
    }
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button className="bg-green-600 hover:bg-green-700">
            <Download className="w-4 h-4 mr-2" />
            Export Resume
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-48">
          <DropdownMenuItem onClick={() => handleExport(exportToPDF, 'PDF')}>
            <FileText className="w-4 h-4 mr-2 text-red-500" />
            Export as PDF
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleExport(exportToDOCX, 'DOCX')}>
            <File className="w-4 h-4 mr-2 text-blue-500" />
            Export as DOCX
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleExport(exportToHTML, 'HTML')}>
            <Globe className="w-4 h-4 mr-2 text-orange-500" />
            Export as HTML
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <FeedbackModal 
        isOpen={showFeedback} 
        onClose={() => setShowFeedback(false)} 
      />
    </>
  );
};
