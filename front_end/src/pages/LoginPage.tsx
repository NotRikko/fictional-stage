"use client"
 
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
 
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useNavigate } from "react-router-dom"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"

const formSchema = z.object({
  username: z.string(),
  password: z.string()
})



export default function LoginPage() {
    const navigate = useNavigate();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
          username: "",
          password: "",
        },
    });

    function onSubmit(values: z.infer<typeof formSchema>) {
        console.log(values);
    }

    return (
        <div className="w-screen h-screen flex flex-col items-center justify-center">
            <div className="w-2/3 h-4/5 flex flex-row border-4 border-black-500/50 rounded-lg">
                <div className="w-1/2 flex flex-col p-24 gap-12">
                    <h1 className="text-4xl">Login</h1>
                    <Form {...form}>
                        <form  className="flex flex-col gap-6" onSubmit ={form.handleSubmit(onSubmit)}>
                            <FormField
                                control={form.control}
                                name="username"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Username</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Username" {...field} />
                                        </FormControl>
                                        <FormDescription>
                                            Please enter your username.
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
                                        <FormLabel>Password</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Password" {...field} />
                                        </FormControl>
                                        <FormDescription>
                                            Please enter your password.
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <Button type="submit">Submit</Button>
                        </form>
                        </Form>
                        <p 
                            className="text-s cursor-pointer text-blue-500 hover:underline"
                            onClick={() => navigate("/signup")}
                        >
                            Don't have an account? Signup here.
                        </p>
                    </div>
                    <img src="https://i.pinimg.com/736x/38/20/0f/38200f57a3fd181677d4a90574c39d35.jpg" className="w-1/2"/>
            </div>
        </div>
    );
}