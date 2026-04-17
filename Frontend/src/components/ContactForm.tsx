import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Mail, User, MessageSquare, CheckCircle, Mountain, Phone, MapPin } from "lucide-react";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  phone: z.string().optional(),
  destination: z.string().optional(),
  message: z.string().min(10, {
    message: "Message must be at least 10 characters.",
  }),
});

type FormValues = z.infer<typeof formSchema>;

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      destination: "",
      message: "",
    },
  });

  function onSubmit(values: FormValues) {
    // In a real app, this would send data to a backend
    console.log("Form Submitted:", values);
    setSubmitted(true);
    form.reset();
    setTimeout(() => setSubmitted(false), 3000);
  }

  if (submitted) {
    return (
      <Card className="w-full max-w-2xl mx-auto border-emerald-300 bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50 shadow-xl">
        <CardContent className="pt-12 pb-12 text-center space-y-4">
          <div className="flex justify-center">
            <div className="p-4 rounded-full bg-gradient-to-br from-emerald-200 to-green-200 animate-pulse">
              <CheckCircle className="w-14 h-14 text-emerald-700" />
            </div>
          </div>
          <h3 className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
            Message Sent Successfully! 🎉
          </h3>
          <p className="text-emerald-700 text-lg">
            Thank you for contacting us! Our Himachal tourism experts will get back to you within 24 hours.
          </p>
          <Button 
            onClick={() => setSubmitted(false)} 
            className="w-full sm:w-auto bg-gradient-to-r from-emerald-600 to-teal-600 hover:shadow-lg"
          >
            Send Another Message
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-2xl mx-auto border-2 border-amber-300 shadow-2xl overflow-hidden">
      {/* Colorful Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 pointer-events-none" />
      
      {/* Colorful Header */}
      <CardHeader className="relative bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white border-b-4 border-amber-400">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-white/20 backdrop-blur-sm">
            <Mountain className="w-7 h-7" />
          </div>
          <div>
            <CardTitle className="text-3xl font-bold">Plan Your Adventure</CardTitle>
            <CardDescription className="text-blue-100 text-base">
              Connect with our Himachal tourism experts for personalized recommendations
            </CardDescription>
          </div>
        </div>
      </CardHeader>

      <CardContent className="relative pt-8 pb-8">
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* Name Field */}
          <div className="space-y-2 bg-gradient-to-r from-blue-50 to-blue-100/50 p-4 rounded-lg border-l-4 border-blue-500">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-blue-600 text-white rounded-lg">
                <User className="w-4 h-4" />
              </div>
              <Label htmlFor="name" className="font-bold text-blue-900">Full Name</Label>
            </div>
            <Input 
              id="name" 
              placeholder="Enter your full name" 
              {...form.register("name")}
              className="border-2 border-blue-300 bg-white focus-visible:border-blue-600 focus-visible:ring-blue-300"
            />
            {form.formState.errors.name && (
              <p className="text-sm text-red-600 font-semibold flex items-center gap-1">
                ⚠️ {form.formState.errors.name.message}
              </p>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Email Field */}
            <div className="space-y-2 bg-gradient-to-r from-purple-50 to-purple-100/50 p-4 rounded-lg border-l-4 border-purple-500">
              <div className="flex items-center gap-2">
                <div className="p-2 bg-purple-600 text-white rounded-lg">
                  <Mail className="w-4 h-4" />
                </div>
                <Label htmlFor="email" className="font-bold text-purple-900">Email</Label>
              </div>
              <Input 
                id="email" 
                type="email" 
                placeholder="your@email.com" 
                {...form.register("email")}
                className="border-2 border-purple-300 bg-white focus-visible:border-purple-600 focus-visible:ring-purple-300"
              />
              {form.formState.errors.email && (
                <p className="text-sm text-red-600 font-semibold flex items-center gap-1">
                  ⚠️ {form.formState.errors.email.message}
                </p>
              )}
            </div>

            {/* Phone Field */}
            <div className="space-y-2 bg-gradient-to-r from-pink-50 to-pink-100/50 p-4 rounded-lg border-l-4 border-pink-500">
              <div className="flex items-center gap-2">
                <div className="p-2 bg-pink-600 text-white rounded-lg">
                  <Phone className="w-4 h-4" />
                </div>
                <Label htmlFor="phone" className="font-bold text-pink-900">Phone (Optional)</Label>
              </div>
              <Input 
                id="phone" 
                type="tel" 
                placeholder="+91 98765 43210" 
                {...form.register("phone")}
                className="border-2 border-pink-300 bg-white focus-visible:border-pink-600 focus-visible:ring-pink-300"
              />
            </div>
          </div>

          {/* Destination Field */}
          <div className="space-y-2 bg-gradient-to-r from-amber-50 to-orange-100/50 p-4 rounded-lg border-l-4 border-amber-600">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-amber-600 text-white rounded-lg">
                <MapPin className="w-4 h-4" />
              </div>
              <Label htmlFor="destination" className="font-bold text-amber-900">Interested Destination (Optional)</Label>
            </div>
            <select 
              id="destination"
              {...form.register("destination")}
              className="flex h-10 w-full rounded-md border-2 border-amber-300 bg-white px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:border-amber-600 font-semibold text-amber-900"
            >
              <option value="">Select a destination...</option>
              <option value="shimla">🏔️ Shimla</option>
              <option value="manali">⛰️ Manali</option>
              <option value="kheerganga">🥾 Kheerganga Trek</option>
              <option value="hadimba">🛕 Hadimba Temple</option>
              <option value="spiti">🏜️ Spiti Valley</option>
              <option value="triund">🚶 Triund Trek</option>
              <option value="other">✨ Other</option>
            </select>
          </div>

          {/* Message Field */}
          <div className="space-y-2 bg-gradient-to-r from-teal-50 to-cyan-100/50 p-4 rounded-lg border-l-4 border-teal-500">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-teal-600 text-white rounded-lg">
                <MessageSquare className="w-4 h-4" />
              </div>
              <Label htmlFor="message" className="font-bold text-teal-900">Your Message</Label>
            </div>
            <textarea 
              id="message" 
              className="flex min-h-[120px] w-full rounded-md border-2 border-teal-300 bg-white px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-300 focus-visible:border-teal-600 disabled:cursor-not-allowed disabled:opacity-50 resize-none font-medium"
              placeholder="Tell us about your travel plans, preferred dates, budget, or any special requirements..." 
              {...form.register("message")}
            ></textarea>
            {form.formState.errors.message && (
              <p className="text-sm text-red-600 font-semibold flex items-center gap-1">
                ⚠️ {form.formState.errors.message.message}
              </p>
            )}
          </div>

          {/* Colorful Submit Button */}
          <Button 
            type="submit" 
            className="w-full bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 hover:from-blue-700 hover:via-purple-700 hover:to-pink-700 text-white font-bold py-6 text-base shadow-lg hover:shadow-xl transition-all"
          >
            🚀 Send Message
          </Button>

          <p className="text-xs text-center text-gray-700 font-semibold bg-gradient-to-r from-yellow-100 to-orange-100 p-3 rounded-lg border border-yellow-300">
            ⏱️ We'll respond within 24 hours. You can also call us or visit our office.
          </p>
        </form>
      </CardContent>
    </Card>
  );
}
