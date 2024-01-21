import { useGetCommentsQuery, usePostCommentMutation } from '@/redux/api';
import { useState } from 'react';
import { FiSend } from 'react-icons/fi';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';

// const dummyComments = [
//   'Bhalo na',
//   'Ki shob ghori egula??',
//   'Eta kono product holo ??',
//   '200 taka dibo, hobe ??',
// ];

export default function ProductReview({ id }: { id?: string }) {
  const [inputComment, setInputComment] = useState<string>('');

  const { data } = useGetCommentsQuery(id, {
    refetchOnMountOrArgChange: true,
    refetchOnFocus: true,
    pollingInterval: 30000,
  });
  const comments = data?.comments || [];

  const [postComment, { isLoading, isError, isSuccess }] =
    usePostCommentMutation();

  console.log({ isLoading, isError, isSuccess });

  return (
    <div className="max-w-7xl mx-auto mt-5">
      <div className="flex gap-5 items-center">
        <Textarea
          onChange={(e) => setInputComment(e.target.value)}
          className="min-h-[30px]"
        />
        <Button
          onClick={() => postComment({ id, comment: inputComment })}
          className="rounded-full h-10 w-10 p-2 text-[25px]"
        >
          <FiSend />
        </Button>
      </div>
      <div className="mt-10">
        {comments?.map((comment: string, index: number) => (
          <div key={index} className="flex gap-3 items-center mb-5">
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <p>{comment}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
