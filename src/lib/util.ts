import { FileTree } from "./types";

export const slugify = (str: string): string => {
  str = str.replace(/^\s+|\s+$/g, ""); // trim
  str = str.toLowerCase();

  // remove accents, swap ñ for n, etc
  const from = "àáäâèéëêìíïîòóöôùúüûñç·/_,:;";
  const to = "aaaaeeeeiiiioooouuuunc------";
  for (let i = 0, l = from.length; i < l; i++) {
    str = str.replace(new RegExp(from.charAt(i), "g"), to.charAt(i));
  }

  str = str
    .replace(/[^a-z0-9 -]/g, "") // remove invalid chars
    .replace(/\s+/g, "-") // collapse whitespace and replace by -
    .replace(/-+/g, "-"); // collapse dashes

  return str;
};

export const getFilePath = (fileUrl: string): string => {
  return fileUrl
    .replace("https://raw.githubusercontent.com/", "")
    .replace("/HEAD", "");
};

const allowedExtensions = [".md", ".markdown", ".txt"];

export const filterFileTree = (fileTree: FileTree[]) => {
  const fileType = (type) => (type === "blob" ? "z" : "a");

  return fileTree
    .filter(({ path, type }) => {
      if (type === "blob") {
        return allowedExtensions.some((extension) =>
          path.toLowerCase().endsWith(extension)
        );
      }

      return true;
    })
    .sort((a, b) => fileType(a.type).localeCompare(fileType(b.type)));
};
