import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"
 
export function cn(...inputs) {
  return twMerge(clsx(inputs))
}

export const cheakLike =(likes, userId)=>{
  const cheakLike = likes.includes(userId)
  return cheakLike;
}
export const multiFormatDateString = (timestamp = "")=> {
  const timestampNum = Math.round(new Date(timestamp).getTime() / 1000);
  const date = new Date(timestampNum * 1000);
  const now = new Date();

  const diff = now.getTime() - date.getTime();
  const diffInSeconds = diff / 1000;
  const diffInMinutes = diffInSeconds / 60;
  const diffInHours = diffInMinutes / 60;
  const diffInDays = diffInHours / 24;

  switch (true) {
    case Math.floor(diffInDays) >= 30:
      return `${Math.floor(diffInDays)} d`;
    case Math.floor(diffInDays) === 1:
      return `${Math.floor(diffInDays)} d`;
    case Math.floor(diffInDays) > 1 && diffInDays < 30:
      return `${Math.floor(diffInDays)} d`;
    case Math.floor(diffInHours) >= 1:
      return `${Math.floor(diffInHours)} hr`;
    case Math.floor(diffInMinutes) >= 1:
      return `${Math.floor(diffInMinutes)} min`;
    default:
      return "Just now";
  }
};
