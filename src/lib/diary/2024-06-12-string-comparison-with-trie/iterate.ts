interface IteratorProps {
  from: number;
  to: number;
  action: (n: number) => void;
  complete: () => void;
}

export function iterate({ from, to, action, complete }: IteratorProps) {
  let i = from;
  let canceled = false;

  const runAction = () => {
    action(i);
    i++;
    if (i < to && !canceled) {
      setTimeout(runAction, 1);
    } else {
      complete();
    }
  };

  setTimeout(runAction, 1);

  return () => {
    canceled = true;
  };
}
