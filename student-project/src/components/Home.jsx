
export const Home = () => {
  return (
    <>
    <div className="mx-auto text-center">
      <p className="pt-8 pb-2 text-3xl font-semibold text-blue-600">Welcome to Student Management</p>
     <div className="gap-0 hidden md:flex">
      <div className="w-[65%] bg-slate-400 h-[550px]">
      {/* <img src="../../public/p2.jpg" className="h-[550px] w-[900px]" alt="" /> */}
      </div>
      <div className="w-[35%] bg-slate-800 min-h-[550px] ">
      <img src="../../public/p1.jpg" className="h-[550px]" alt="" />

      </div>
     </div>
    </div>
    </>
  )
}
