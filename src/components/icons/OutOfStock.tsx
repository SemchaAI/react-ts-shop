import { IClassName } from './props';

export default function OutOfStock({ className }: IClassName) {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 256 256"
      id="x-circle"
    >
      <circle
        cx="128"
        cy="128"
        r="96"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="8"
        stroke="#cf6679"
      ></circle>
      <line
        x1="160"
        x2="96"
        y1="96"
        y2="160"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="8"
        stroke="#cf6679"
      ></line>
      <line
        x1="160"
        x2="96"
        y1="160"
        y2="96"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="8"
        stroke="#cf6679"
      ></line>
    </svg>
  );
}
