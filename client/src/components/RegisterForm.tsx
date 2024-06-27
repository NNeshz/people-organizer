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
import { fetchRegister } from "../api/auth";

const regisrteFormSchema = z.object({
  username: z.string().min(3).max(20),
  email: z.string().email(),
  password: z.string().min(8),
});

const RegisterForm = () => {
  const form = useForm<z.infer<typeof regisrteFormSchema>>({
    resolver: zodResolver(regisrteFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof regisrteFormSchema>) {
    try {
      const data = fetchRegister(values)
      console.log(data)
    } catch (error) {
      console.log("Error: ", error)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <h2 className="text-white text-2xl font-semibold">
          Let&apos;s get started
        </h2>
        <p className="text-zinc-500 text-sm mt-2">
            Create an account to start using our services. We are happy to see you here!
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
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-white">Username</FormLabel>
              <FormControl>
                <Input placeholder="NNeshz" {...field} />
              </FormControl>
              <FormDescription>
                Username must be at least 3 characters.
              </FormDescription>
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

export default RegisterForm;
