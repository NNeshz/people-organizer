import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "./ui/button";
import {
  Form,
  FormControl,
  FormLabel,
  FormMessage,
  FormField,
  FormItem,
  FormDescription,
} from "./ui/form";
import { Input } from "./ui/input";
import { useNavigate } from "react-router-dom";
import useUserStore from "../context/useUserStore";

const loginFormSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

const LoginForm = () => {

  const fetchLogin = useUserStore((state) => state.login);
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof loginFormSchema>>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof loginFormSchema>) {
    try {
      const data = await fetchLogin(values);
      if (data?.status === 202) {
        navigate("/dashboard")
      }
    } catch (error) {
      console.error("Error:", error);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <h2 className="text-white text-2xl font-semibold">
          Login in to your account
        </h2>
        <p className="text-zinc-500 text-sm mt-2">
          It is always nice to see you again! Please login to your account to
          continue using our services.
        </p>
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-white">Email</FormLabel>
              <FormControl>
                <Input placeholder="someone@mail.com" {...field} />
              </FormControl>
              <FormDescription>We'll never share your email.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-white">Password</FormLabel>
              <FormControl>
                <Input type="password" {...field} />
              </FormControl>
              <FormDescription>
                Password must be at least 6 characters.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full mt-6">
          Submit
        </Button>
      </form>
    </Form>
  );
};

export default LoginForm;
