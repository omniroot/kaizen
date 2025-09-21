import { getUserOptions } from "@/api/users/users.api.ts";
import { Text } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";

export const ProfilePage = () => {
  const { data: user } = useQuery(getUserOptions());

  return (
    <div>
      <h1>Profile</h1>
      <Text>{user?.nickname}</Text>
    </div>
  );
};
