'use client'

import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"

import Profile from "@components/Profile"

export default function ProfilePage() {
  const { data: session } = useSession();
  const router = useRouter();

  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await fetch(`/api/users/${session?.user.id}/posts`);
      const data = await res.json();

      setPosts(data);
    };

    if (session?.user.id) fetchPosts();

    return () => {

    }
  }, []);

  const handleEdit = (id) => {
    router.push(`/update-prompt?id=${id}`);
  };

  const handleDelete = async () => {
    const hasConfirmed = confirm("Are you sure you want to delete the prompt?");

    if (hasConfirmed) {
      try {
        await fetch(`/api/prompt/${id.toString()}`, {
          method: "DELETE"
        });

        const filteredPosts = posts.filter(p => p._id !== posts._id);

        setPosts(filteredPosts);
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <Profile
      name="My"
      desc="Welcome to your own profile page"
      data={posts}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
    />
  );
}
