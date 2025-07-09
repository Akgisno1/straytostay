"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { User, Building2, Calendar, Phone, Globe } from "lucide-react";

// Indian States and Cities data
const indianStates = [
  {
    name: "Andhra Pradesh",
    cities: ["Visakhapatnam", "Vijayawada", "Guntur", "Nellore", "Kurnool"],
  },
  {
    name: "Arunachal Pradesh",
    cities: ["Itanagar", "Naharlagun", "Pasighat", "Tezu", "Bomdila"],
  },
  {
    name: "Assam",
    cities: ["Guwahati", "Dibrugarh", "Jorhat", "Silchar", "Tezpur"],
  },
  {
    name: "Bihar",
    cities: ["Patna", "Gaya", "Bhagalpur", "Muzaffarpur", "Purnia"],
  },
  {
    name: "Chhattisgarh",
    cities: ["Raipur", "Bhilai", "Bilaspur", "Korba", "Jagdalpur"],
  },
  {
    name: "Delhi",
    cities: [
      "New Delhi",
      "North Delhi",
      "South Delhi",
      "East Delhi",
      "West Delhi",
    ],
  },
  {
    name: "Goa",
    cities: ["Panaji", "Margao", "Vasco da Gama", "Mapusa", "Ponda"],
  },
  {
    name: "Gujarat",
    cities: ["Ahmedabad", "Surat", "Vadodara", "Rajkot", "Bhavnagar"],
  },
  {
    name: "Haryana",
    cities: ["Gurgaon", "Faridabad", "Chandigarh", "Panipat", "Hisar"],
  },
  {
    name: "Himachal Pradesh",
    cities: ["Shimla", "Manali", "Dharamshala", "Kullu", "Solan"],
  },
  {
    name: "Jharkhand",
    cities: ["Ranchi", "Jamshedpur", "Dhanbad", "Bokaro", "Hazaribagh"],
  },
  {
    name: "Karnataka",
    cities: ["Bangalore", "Mysore", "Hubli", "Mangalore", "Belgaum"],
  },
  {
    name: "Kerala",
    cities: ["Thiruvananthapuram", "Kochi", "Kozhikode", "Thrissur", "Kollam"],
  },
  {
    name: "Madhya Pradesh",
    cities: ["Bhopal", "Indore", "Jabalpur", "Gwalior", "Ujjain"],
  },
  {
    name: "Maharashtra",
    cities: ["Mumbai", "Pune", "Nagpur", "Thane", "Nashik"],
  },
  {
    name: "Manipur",
    cities: ["Imphal", "Thoubal", "Bishnupur", "Churachandpur", "Ukhrul"],
  },
  {
    name: "Meghalaya",
    cities: ["Shillong", "Tura", "Jowai", "Nongstoin", "Williamnagar"],
  },
  {
    name: "Mizoram",
    cities: ["Aizawl", "Lunglei", "Saiha", "Champhai", "Kolasib"],
  },
  {
    name: "Nagaland",
    cities: ["Kohima", "Dimapur", "Mokokchung", "Tuensang", "Wokha"],
  },
  {
    name: "Odisha",
    cities: ["Bhubaneswar", "Cuttack", "Rourkela", "Brahmapur", "Sambalpur"],
  },
  {
    name: "Punjab",
    cities: ["Chandigarh", "Ludhiana", "Amritsar", "Jalandhar", "Patiala"],
  },
  {
    name: "Rajasthan",
    cities: ["Jaipur", "Jodhpur", "Udaipur", "Kota", "Ajmer"],
  },
  {
    name: "Sikkim",
    cities: ["Gangtok", "Namchi", "Mangan", "Gyalshing", "Soreng"],
  },
  {
    name: "Tamil Nadu",
    cities: ["Chennai", "Coimbatore", "Madurai", "Salem", "Tiruchirappalli"],
  },
  {
    name: "Telangana",
    cities: ["Hyderabad", "Warangal", "Nizamabad", "Karimnagar", "Khammam"],
  },
  {
    name: "Tripura",
    cities: ["Agartala", "Udaipur", "Dharmanagar", "Kailasahar", "Belonia"],
  },
  {
    name: "Uttar Pradesh",
    cities: ["Lucknow", "Kanpur", "Varanasi", "Agra", "Prayagraj"],
  },
  {
    name: "Uttarakhand",
    cities: ["Dehradun", "Haridwar", "Rishikesh", "Nainital", "Almora"],
  },
  {
    name: "West Bengal",
    cities: ["Kolkata", "Howrah", "Durgapur", "Asansol", "Siliguri"],
  },
];

type UserType = "user" | "ngo" | null;

interface FormData {
  name: string;
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  phoneNumber: string;
  bio: string;
  state: string;
  city: string;
  // NGO specific fields
  ngoName: string;
  foundedDate: string;
  website: string;
  instagram: string;
}

const OnboardingForm = () => {
  const [userType, setUserType] = useState<UserType>(null);
  const [formData, setFormData] = useState<FormData>({
    name: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    phoneNumber: "",
    bio: "",
    state: "",
    city: "",
    ngoName: "",
    foundedDate: "",
    website: "",
    instagram: "",
  });

  const [selectedState, setSelectedState] = useState("");
  const [availableCities, setAvailableCities] = useState<string[]>([]);

  const handleStateChange = (state: string) => {
    setSelectedState(state);
    setFormData((prev) => ({ ...prev, state, city: "" }));
    const stateData = indianStates.find((s) => s.name === state);
    setAvailableCities(stateData?.cities || []);
  };

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", { userType, formData });
    // Handle form submission logic here
  };

  const UserTypeCard = ({
    type,
    title,
    description,
    icon: Icon,
    isSelected,
  }: {
    type: UserType;
    title: string;
    description: string;
    icon: React.ComponentType<{ className?: string }>;
    isSelected: boolean;
  }) => (
    <div
      className={cn(
        "relative group cursor-pointer rounded-xl border-2 p-6 transition-all duration-300 ease-in-out",
        "hover:scale-105 hover:shadow-lg hover:shadow-green-500/20",
        "bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-800",
        isSelected
          ? "border-green-500 bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20"
          : "border-gray-200 dark:border-gray-700 hover:border-green-300 dark:hover:border-green-600"
      )}
      onClick={() => setUserType(type)}
    >
      {/* Gradient overlay on hover */}
      <div
        className={cn(
          "absolute inset-0 rounded-xl bg-gradient-to-br from-green-500/0 to-green-500/0 transition-all duration-300",
          "group-hover:from-green-500/5 group-hover:to-green-500/10"
        )}
      />

      <div className="relative z-10">
        <div className="flex items-center gap-4 mb-4">
          <div
            className={cn(
              "p-3 rounded-lg transition-all duration-300",
              "bg-green-100 dark:bg-green-900/30 group-hover:bg-green-200 dark:group-hover:bg-green-800/40"
            )}
          >
            <Icon
              className={cn(
                "w-6 h-6 transition-all duration-300",
                "text-green-600 dark:text-green-400 group-hover:text-white group-hover:scale-110"
              )}
            />
          </div>
          <div>
            <h3
              className={cn(
                "text-lg font-semibold transition-all duration-300",
                "text-gray-900 dark:text-white group-hover:text-white"
              )}
            >
              {title}
            </h3>
            <p
              className={cn(
                "text-sm transition-all duration-300",
                "text-gray-600 dark:text-gray-400 group-hover:text-white/90"
              )}
            >
              {description}
            </p>
          </div>
        </div>

        {/* Selection indicator */}
        {isSelected && (
          <div className="absolute top-4 right-4 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
            <div className="w-2 h-2 bg-white rounded-full" />
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="w-full max-w-2xl mx-auto">
      {!userType ? (
        // User Type Selection
        <div className="space-y-8">
          <div className="text-center space-y-2">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-green-600 to-green-800 bg-clip-text text-transparent">
              Welcome to StraytoStay
            </h1>
            <p className="text-muted-foreground text-lg">
              Choose how you&apos;d like to join our community
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <UserTypeCard
              type="user"
              title="Register as User"
              description="Join as an individual to adopt pets, share stories, and connect with the community"
              icon={User}
              isSelected={userType === "user"}
            />

            <UserTypeCard
              type="ngo"
              title="Register as NGO"
              description="Join as an organization to manage adoptions, host events, and help animals"
              icon={Building2}
              isSelected={userType === "ngo"}
            />
          </div>
        </div>
      ) : (
        // Registration Form
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="text-center space-y-2">
            <h1 className="text-2xl font-bold">
              Complete Your {userType === "ngo" ? "NGO" : "User"} Profile
            </h1>
            <p className="text-muted-foreground text-sm">
              Tell us more about yourself to get started
            </p>
          </div>

          <div className="grid gap-4">
            {/* Basic Information */}
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  placeholder="Enter your full name"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  value={formData.username}
                  onChange={(e) =>
                    handleInputChange("username", e.target.value)
                  }
                  placeholder="Choose a unique username"
                  required
                />
              </div>
            </div>

            {/* Email and Phone */}
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  placeholder="Enter your email"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phoneNumber">Phone Number</Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    id="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={(e) =>
                      handleInputChange("phoneNumber", e.target.value)
                    }
                    placeholder="Enter phone number"
                    className="pl-10"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Password Fields */}
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={formData.password}
                  onChange={(e) =>
                    handleInputChange("password", e.target.value)
                  }
                  placeholder="Create a strong password"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  value={formData.confirmPassword}
                  onChange={(e) =>
                    handleInputChange("confirmPassword", e.target.value)
                  }
                  placeholder="Confirm your password"
                  required
                />
              </div>
            </div>

            {/* Location */}
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="state">State</Label>
                <Select value={selectedState} onValueChange={handleStateChange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select your state" />
                  </SelectTrigger>
                  <SelectContent>
                    {indianStates.map((state) => (
                      <SelectItem key={state.name} value={state.name}>
                        {state.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="city">City</Label>
                <Select
                  value={formData.city}
                  onValueChange={(city) => handleInputChange("city", city)}
                  disabled={!selectedState}
                >
                  <SelectTrigger>
                    <SelectValue
                      placeholder={
                        selectedState
                          ? "Select your city"
                          : "Select state first"
                      }
                    />
                  </SelectTrigger>
                  <SelectContent>
                    {availableCities.map((city) => (
                      <SelectItem key={city} value={city}>
                        {city}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Bio */}
            <div className="space-y-2">
              <Label htmlFor="bio">Bio</Label>
              <Textarea
                id="bio"
                value={formData.bio}
                onChange={(e) => handleInputChange("bio", e.target.value)}
                placeholder="Tell us about yourself..."
                rows={3}
              />
            </div>

            {/* NGO Specific Fields */}
            {userType === "ngo" && (
              <div className="space-y-4 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
                <h3 className="font-semibold text-green-800 dark:text-green-200 flex items-center gap-2">
                  <Building2 className="w-4 h-4" />
                  Organization Details
                </h3>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="ngoName">Organization Name</Label>
                    <Input
                      id="ngoName"
                      value={formData.ngoName}
                      onChange={(e) =>
                        handleInputChange("ngoName", e.target.value)
                      }
                      placeholder="Enter organization name"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="foundedDate">Founded Date</Label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <Input
                        id="foundedDate"
                        type="date"
                        value={formData.foundedDate}
                        onChange={(e) =>
                          handleInputChange("foundedDate", e.target.value)
                        }
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="website">Website</Label>
                    <div className="relative">
                      <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <Input
                        id="website"
                        value={formData.website}
                        onChange={(e) =>
                          handleInputChange("website", e.target.value)
                        }
                        placeholder="https://your-website.com"
                        className="pl-10"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="instagram">Instagram Handle</Label>
                    <Input
                      id="instagram"
                      value={formData.instagram}
                      onChange={(e) =>
                        handleInputChange("instagram", e.target.value)
                      }
                      placeholder="@your_handle"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Submit Button */}
            <div className="space-y-4">
              <Button
                type="submit"
                className="w-full bg-green-600 hover:bg-green-700 transition-all duration-300 transform hover:scale-105"
              >
                Complete Registration
              </Button>

              <Button
                type="button"
                variant="outline"
                className="w-full"
                onClick={() => setUserType(null)}
              >
                ← Back to Selection
              </Button>
            </div>
          </div>
        </form>
      )}
    </div>
  );
};

export default OnboardingForm;
