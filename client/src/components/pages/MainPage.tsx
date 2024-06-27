import LoginForm from "../LoginForm";
import RegisterForm from "../RegisterForm";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";


const MainPage = () => {
  return (
    <div className="w-full lg:grid lg:grid-cols-2 h-screen">
      <div className="bg-zinc-950 flex flex-col justify-center items-center h-screen px-10 md:px-28">
        <div className="flex flex-col items-center border border-zinc-900 rounded-lg p-5">
          <Tabs defaultValue="login" className="w-full md:w-[400px]">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="login">Log in</TabsTrigger>
              <TabsTrigger value="register">Register</TabsTrigger>
            </TabsList>
            <TabsContent value="login">
              <LoginForm />
            </TabsContent>
            <TabsContent value="register">
              <RegisterForm />
            </TabsContent>
          </Tabs>
        </div>
      </div>
      <div className="hidden md:block">
        <img
          src="https://plus.unsplash.com/premium_photo-1664300442121-794e137b141c?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Main picture"
          className="object-cover h-full w-full"
        />
      </div>
    </div>
)
}

export default MainPage