"use client";
import Loader from "@/components/Loader";
import { useUserStore } from "@/stores";
import { formatDateMMDDYYYYHHMM } from "@/utils";

const Profile = () => {
  const { user } = useUserStore();
  if(!user){
    return <Loader />;
  }
  const data = [
    { label: "Name", value: user?.name },
    { label: "Email", value: user?.email },
    { label: "Joined on ", value: formatDateMMDDYYYYHHMM(user!.createdAt!) },
  ];
  return (
    <div className="bg-var-primary min-h-screen flex justify-center items-center">
      <div className="bg-var-secondary rounded-xl shadow-lg px-4 py-4 ">
        <img
          src={'https://avatar.iran.liara.run/public/18'}
          alt={user?.name}
          className="w-30 h-30 rounded-full border border-var-tertiary p-2 mx-auto mb-2"
        />
        <table className="border-separate border-spacing-x-3 border-spacing-y-2">
          <tbody>
            {data.map((item) => (
              <tr key={item.label}>
                <td className="text-sm text-gray-500 font-normal">
                  {item.label}
                </td>
                <td className="text-sm text-gray-900">{item.value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Profile;
