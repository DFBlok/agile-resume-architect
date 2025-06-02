
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { Download, FileText, File, Globe } from "lucide-react";
import { toast } from "sonner";

interface ExportOptionsProps {
  resumeData: any;
}

export const ExportOptions = ({ resumeData }: ExportOptionsProps) => {
  const exportToPDF = () => {
    // Mock PDF export - in real implementation, this would use html2pdf.js
    toast.success("PDF export would be generated here!");
    console.log("Exporting to PDF:", resumeData);
  };

  const exportToDOCX = () => {
    // Mock DOCX export - in real implementation, this would use html-docx-js
    toast.success("DOCX export would be generated here!");
    console.log("Exporting to DOCX:", resumeData);
  };

  const exportToHTML = () => {
    // Mock HTML export
    toast.success("HTML export would be generated here!");
    console.log("Exporting to HTML:", resumeData);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="bg-green-600 hover:bg-green-700">
          <Download className="w-4 h-4 mr-2" />
          Export Resume
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-48 bg-white border shadow-lg">
        <DropdownMenuItem onClick={exportToPDF} className="cursor-pointer">
          <FileText className="w-4 h-4 mr-2 text-red-500" />
          Export as PDF
        </DropdownMenuItem>
        <DropdownMenuItem onClick={exportToDOCX} className="cursor-pointer">
          <File className="w-4 h-4 mr-2 text-blue-500" />
          Export as DOCX
        </DropdownMenuItem>
        <DropdownMenuItem onClick={exportToHTML} className="cursor-pointer">
          <Globe className="w-4 h-4 mr-2 text-orange-500" />
          Export as HTML
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
