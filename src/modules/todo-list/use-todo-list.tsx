import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { todoListApi } from "./api.ts";
import { useCallback, useRef } from "react";

export function useTodoList() {
  const {
    data: todoItems,
    error,
    isPending,
    //refetch,
    //fetchNextPage,
    //hasNextPage,
    //isFetchingNextPage,
  } = useQuery({
    ...todoListApi.getTodoListQueryOptions(),
    select: (data) => data.toReversed(),
  });

  /*const cursorRef = useIntersection(() => {
    fetchNextPage();
  });*/

  /* const cursor = (
    <div className="mt-3 flex gap-3" ref={cursorRef}>
      {/!*<button
          onClick={() => setPage((p) => Math.max(p - 1, 1))}
          className="p-3 rounded border border-teal-500 cursor-pointer"
        >
          prev
        </button>
        <button
          onClick={() => setPage((p) => Math.min(p + 1, todoItems?.pages))}
          className="p-3 rounded border border-teal-500 cursor-pointer"
        >
          next
        </button>*!/}
    </div>
  );*/

  return {
    error,
    todoItems,
    isPending,
    //refetch,
    //cursor
  };
}

export function useIntersection(onIntersect: () => void) {
  const unsubscribe = useRef(() => {});

  return useCallback((el: HTMLDivElement | null) => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          onIntersect();
        }
      });
    });

    if (el) {
      observer.observe(el);
      unsubscribe.current = () => observer.disconnect();
    } else {
      unsubscribe.current();
    }
  }, []);
}
