import { isArrayOfFiles, isArrayOfStrings } from "@/utils/typeGuard";
import { type KeyboardEventHandler } from "react";
import toast from "react-hot-toast";

type FormObject = {
  [key: string]: string | number | File | File[] | undefined | null;
};

/**
 * formDataから全ての値を取得する
 * @param formData FormData
 * @param formObject 型情報を含んだ初期値などのオブジェクト
 * @returns 全ての値が入ったオブジェクト
 */
export const getFormValues = <T extends FormObject>(
  formData: FormData,
  formObject: T,
) =>
  Object.keys(formObject).reduce((acc, key) => {
    const value = isArrayOfFiles(formObject[key])
      ? (formData.getAll(key) as File[])
      : Number.isInteger(formObject[key])
        ? Number(formData.get(key))
        : (formData.get(key) as T[typeof key]);
    return { ...acc, [key]: value };
  }, {} as T);

/**
 * Ctrl + Enterでフォームを送信する
 * @param event キーボードイベント
 */
export const handleCtrlEnterSubmit: KeyboardEventHandler<
  HTMLTextAreaElement
> = (event) => {
  const isCtrlEnter = event.ctrlKey && event.key === "Enter";
  if (!isCtrlEnter) return;
  const form = event.currentTarget.form;
  if (form) {
    form.requestSubmit();
  }
};

/**
 * エラーをトースト表示する
 * @param obj エラーのオブジェクト
 */
export const toastErrors = <T>(obj: Partial<Record<keyof T, string[]>>) => {
  Object.values(obj).forEach((messages) => {
    if (isArrayOfStrings(messages)) {
      messages.forEach((message) => {
        toast.error(message);
      });
    }
  });
};
