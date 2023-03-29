import * as Form from "@radix-ui/react-form";

import { FileTree } from "@/lib/types";

import DialogDemo from "../ui/Dialog";

type FileDialogProps = {
  file: FileTree;
};

const FileDialog: React.FC<FileDialogProps> = ({ file }) => {
  return (
    <DialogDemo
      description={
        <span>
          Choose where you want to save <b>{file.path}</b> on your profile
          <Form.Root className="w-full">
            <Form.Field className="grid mb-[10px]" name="email">
              <div className="flex items-baseline justify-between">
                <Form.Label className="text-[15px] font-medium leading-[35px] text-dark">
                  Save as
                </Form.Label>
                <Form.Message
                  className="text-[13px] text-dark opacity-[0.8]"
                  match="valueMissing"
                >
                  Please enter the file name
                </Form.Message>
              </div>
              <Form.Control asChild>
                <input
                  defaultValue={file.path}
                  className="box-border w-full bg-blackA5 shadow-blackA9 inline-flex h-[35px] appearance-none items-center justify-center rounded-[4px] px-[10px] text-[15px] leading-none text-dark shadow-[0_0_0_1px] outline-none hover:shadow-[0_0_0_1px_black] focus:shadow-[0_0_0_2px_black] selection:color-dark selection:bg-blackA9"
                  type="text"
                  required
                />
              </Form.Control>
            </Form.Field>
          </Form.Root>
        </span>
      }
      title={file.path}
    ></DialogDemo>
  );
};

export default FileDialog;
