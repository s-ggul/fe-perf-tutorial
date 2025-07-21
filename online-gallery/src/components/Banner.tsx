import banner from "@/assets/event-banner.webp";
// import { useQuery } from "@tanstack/react-query";

// const fetchBanner = async () => {
//   await new Promise((resolve) => setTimeout(resolve, 500));
//   const res = await fetch("/src/assets/event-banner.webp");
//   if (!res.ok) throw new Error("Network response was not ok");
//   return res.json();
// };

function Banner() {
  // const { data: banner } = useQuery({
  //   queryKey: ["banner"],
  //   queryFn: fetchBanner,
  // });

  // const banner = "/event-banner.webp"; // 배너 이미지를 서버에서 불러오는게 아닌 바로 가져오도록

  if (!banner) return null;

  return (
    <div className="w-full bg-[#1a2a3a] flex justify-center items-center mb-14 h-[500px]">
      <img src={banner} alt="Event Banner" className="block h-full" />
    </div>
  );
}

export default Banner;
