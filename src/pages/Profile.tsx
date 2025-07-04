import { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { 
  User, 
  Edit, 
  Save, 
  FileText, 
  CreditCard, 
  Crown,
  Calendar,
  DollarSign,
  Youtube,
  Instagram,
  MapPin,
  Download
} from 'lucide-react';

const Profile = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+1 (555) 123-4567',
    company: 'Content Creator LLC',
    youtubeChannel: 'https://youtube.com/@johndoe',
    instagramHandle: '@johndoe_creator',
    billingAddress: '123 Creator Street, Los Angeles, CA 90210'
  });

  const [editData, setEditData] = useState(profileData);

  const handleEdit = () => {
    setIsEditing(true);
    setEditData(profileData);
  };

  const handleSave = () => {
    setProfileData(editData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditData(profileData);
    setIsEditing(false);
  };

  const myScripts = [
    {
      id: 1,
      title: "The Hidden Impact of Climate Change on Global Economy",
      createdAt: "2024-01-15",
      words: 1247,
      status: "Published"
    },
    {
      id: 2,
      title: "Future of Artificial Intelligence in Healthcare",
      createdAt: "2024-01-10",
      words: 1456,
      status: "Draft"
    },
    {
      id: 3,
      title: "Sustainable Energy Solutions for Modern Cities",
      createdAt: "2024-01-08",
      words: 1123,
      status: "Published"
    }
  ];

  const subscriptionData = {
    plan: "Pro",
    status: "Active",
    nextBilling: "2024-02-15",
    scriptsGenerated: 15,
    scriptsLimit: 50
  };

  const billingHistory = [
    {
      date: "2024-01-15",
      amount: "$29.99",
      plan: "Pro Monthly",
      status: "Paid",
      invoice: "INV-2024-001"
    },
    {
      date: "2023-12-15",
      amount: "$29.99",
      plan: "Pro Monthly",
      status: "Paid",
      invoice: "INV-2023-012"
    },
    {
      date: "2023-11-15",
      amount: "$29.99",
      plan: "Pro Monthly",
      status: "Paid",
      invoice: "INV-2023-011"
    }
  ];

  const tabs = [
    { id: 'profile', label: 'Basic Details', icon: User },
    { id: 'scripts', label: 'My Scripts', icon: FileText },
    { id: 'subscription', label: 'Subscription', icon: Crown },
    { id: 'billing', label: 'Billing', icon: CreditCard }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            My Profile
          </h1>
          <p className="text-gray-600 text-lg">Manage your account settings and view your content</p>
        </div>

        <div className="grid lg:grid-cols-5 gap-8">
          <div className="lg:col-span-1">
            <Card className="shadow-xl bg-white/80 backdrop-blur-sm">
              <CardContent className="p-4">
                <nav className="space-y-2">
                  {tabs.map((tab) => {
                    const IconComponent = tab.icon;
                    return (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                          activeTab === tab.id
                            ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg'
                            : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                        }`}
                      >
                        <IconComponent className="w-5 h-5" />
                        <span className="font-medium">{tab.label}</span>
                      </button>
                    );
                  })}
                </nav>
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-4">
            {activeTab === 'profile' && (
              <Card className="shadow-xl bg-white/80 backdrop-blur-sm">
                <CardHeader className="bg-gradient-to-r from-purple-50 to-blue-50">
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="flex items-center text-2xl">
                        <User className="w-6 h-6 mr-3 text-purple-600" />
                        Profile Information
                      </CardTitle>
                      <CardDescription className="mt-2 text-lg">
                        Update your personal information and preferences
                      </CardDescription>
                    </div>
                    {!isEditing ? (
                      <Button onClick={handleEdit} className="bg-gradient-to-r from-purple-600 to-blue-600">
                        <Edit className="w-4 h-4 mr-2" />
                        Edit Profile
                      </Button>
                    ) : (
                      <div className="flex space-x-3">
                        <Button onClick={handleSave} className="bg-green-600">
                          <Save className="w-4 h-4 mr-2" />
                          Save Changes
                        </Button>
                        <Button onClick={handleCancel} variant="outline">
                          Cancel
                        </Button>
                      </div>
                    )}
                  </div>
                </CardHeader>
                <CardContent className="p-8 space-y-8">
                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="name" className="text-sm font-semibold text-gray-700">Full Name</Label>
                      <Input
                        id="name"
                        value={isEditing ? editData.name : profileData.name}
                        onChange={(e) => setEditData({...editData, name: e.target.value})}
                        disabled={!isEditing}
                        className={`h-12 ${!isEditing ? 'bg-gray-50 border-gray-200' : 'border-purple-300 focus:border-purple-500'}`}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-sm font-semibold text-gray-700">Email Address</Label>
                      <Input
                        id="email"
                        type="email"
                        value={isEditing ? editData.email : profileData.email}
                        onChange={(e) => setEditData({...editData, email: e.target.value})}
                        disabled={!isEditing}
                        className={`h-12 ${!isEditing ? 'bg-gray-50 border-gray-200' : 'border-purple-300 focus:border-purple-500'}`}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone" className="text-sm font-semibold text-gray-700">Phone Number</Label>
                      <Input
                        id="phone"
                        value={isEditing ? editData.phone : profileData.phone}
                        onChange={(e) => setEditData({...editData, phone: e.target.value})}
                        disabled={!isEditing}
                        className={`h-12 ${!isEditing ? 'bg-gray-50 border-gray-200' : 'border-purple-300 focus:border-purple-500'}`}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="company" className="text-sm font-semibold text-gray-700">Company</Label>
                      <Input
                        id="company"
                        value={isEditing ? editData.company : profileData.company}
                        onChange={(e) => setEditData({...editData, company: e.target.value})}
                        disabled={!isEditing}
                        className={`h-12 ${!isEditing ? 'bg-gray-50 border-gray-200' : 'border-purple-300 focus:border-purple-500'}`}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="youtube" className="text-sm font-semibold text-gray-700 flex items-center">
                        <Youtube className="w-4 h-4 mr-2 text-red-600" />
                        YouTube Channel
                      </Label>
                      <Input
                        id="youtube"
                        value={isEditing ? editData.youtubeChannel : profileData.youtubeChannel}
                        onChange={(e) => setEditData({...editData, youtubeChannel: e.target.value})}
                        disabled={!isEditing}
                        className={`h-12 ${!isEditing ? 'bg-gray-50 border-gray-200' : 'border-purple-300 focus:border-purple-500'}`}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="instagram" className="text-sm font-semibold text-gray-700 flex items-center">
                        <Instagram className="w-4 h-4 mr-2 text-pink-600" />
                        Instagram Handle
                      </Label>
                      <Input
                        id="instagram"
                        value={isEditing ? editData.instagramHandle : profileData.instagramHandle}
                        onChange={(e) => setEditData({...editData, instagramHandle: e.target.value})}
                        disabled={!isEditing}
                        className={`h-12 ${!isEditing ? 'bg-gray-50 border-gray-200' : 'border-purple-300 focus:border-purple-500'}`}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="billing" className="text-sm font-semibold text-gray-700 flex items-center">
                      <MapPin className="w-4 h-4 mr-2 text-blue-600" />
                      Billing Address
                    </Label>
                    <Input
                      id="billing"
                      value={isEditing ? editData.billingAddress : profileData.billingAddress}
                      onChange={(e) => setEditData({...editData, billingAddress: e.target.value})}
                      disabled={!isEditing}
                      className={`h-12 ${!isEditing ? 'bg-gray-50 border-gray-200' : 'border-purple-300 focus:border-purple-500'}`}
                    />
                  </div>
                </CardContent>
              </Card>
            )}

            {activeTab === 'scripts' && (
              <Card className="shadow-xl bg-white/80 backdrop-blur-sm">
                <CardHeader className="bg-gradient-to-r from-purple-50 to-blue-50">
                  <CardTitle className="flex items-center text-2xl">
                    <FileText className="w-6 h-6 mr-3 text-blue-600" />
                    My Scripts
                  </CardTitle>
                  <CardDescription className="mt-2 text-lg">
                    View and manage your generated scripts
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-8">
                  <div className="space-y-6">
                    {myScripts.map((script) => (
                      <div key={script.id} className="flex items-center justify-between p-6 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl border border-gray-200 hover:shadow-lg transition-all duration-200">
                        <div className="flex-1">
                          <h3 className="font-bold text-gray-900 text-lg mb-2">{script.title}</h3>
                          <div className="flex items-center space-x-6 text-sm text-gray-600">
                            <span className="flex items-center">
                              <Calendar className="w-4 h-4 mr-1" />
                              {script.createdAt}
                            </span>
                            <span className="flex items-center">
                              <FileText className="w-4 h-4 mr-1" />
                              {script.words} words
                            </span>
                            <Badge variant={script.status === 'Published' ? 'default' : 'secondary'} className="px-3 py-1">
                              {script.status}
                            </Badge>
                          </div>
                        </div>
                        <Link to={`/script/${script.id}`}>
                          <Button className="bg-gradient-to-r from-purple-600 to-blue-600">
                            View Script
                          </Button>
                        </Link>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {activeTab === 'subscription' && (
              <Card className="shadow-xl bg-white/80 backdrop-blur-sm">
                <CardHeader className="bg-gradient-to-r from-purple-50 to-blue-50">
                  <CardTitle className="flex items-center text-2xl">
                    <Crown className="w-6 h-6 mr-3 text-yellow-500" />
                    My Subscription
                  </CardTitle>
                  <CardDescription className="mt-2 text-lg">
                    Manage your subscription and usage
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-8">
                  <div className="grid grid-cols-2 gap-8">
                    <div className="space-y-6">
                      <div className="p-6 bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl">
                        <Label className="text-sm font-semibold text-gray-600">Current Plan</Label>
                        <div className="flex items-center mt-2">
                          <Badge className="bg-gradient-to-r from-purple-600 to-blue-600 text-white mr-3 px-4 py-2 text-lg">
                            {subscriptionData.plan}
                          </Badge>
                          <Badge variant={subscriptionData.status === 'Active' ? 'default' : 'secondary'} className="px-3 py-1">
                            {subscriptionData.status}
                          </Badge>
                        </div>
                      </div>
                      <div className="p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl">
                        <Label className="text-sm font-semibold text-gray-600">Next Billing Date</Label>
                        <div className="flex items-center mt-2">
                          <Calendar className="w-5 h-5 mr-3 text-blue-500" />
                          <span className="text-gray-900 font-medium text-lg">{subscriptionData.nextBilling}</span>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-6">
                      <div className="p-6 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl">
                        <Label className="text-sm font-semibold text-gray-600">Scripts Generated</Label>
                        <div className="mt-2">
                          <div className="text-3xl font-bold text-gray-900">
                            {subscriptionData.scriptsGenerated} / {subscriptionData.scriptsLimit}
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-3 mt-3">
                            <div 
                              className="bg-gradient-to-r from-purple-600 to-blue-600 h-3 rounded-full transition-all duration-500" 
                              style={{ width: `${(subscriptionData.scriptsGenerated / subscriptionData.scriptsLimit) * 100}%` }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex space-x-4 mt-8">
                    <Link to="/pricing">
                      <Button size="lg" className="bg-gradient-to-r from-purple-600 to-blue-600">
                        Upgrade Plan
                      </Button>
                    </Link>
                    <Button variant="outline" size="lg">Cancel Subscription</Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {activeTab === 'billing' && (
              <Card className="shadow-xl bg-white/80 backdrop-blur-sm">
                <CardHeader className="bg-gradient-to-r from-purple-50 to-blue-50">
                  <CardTitle className="flex items-center text-2xl">
                    <CreditCard className="w-6 h-6 mr-3 text-green-600" />
                    Billing Details
                  </CardTitle>
                  <CardDescription className="mt-2 text-lg">
                    View your billing history and payment methods
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-8">
                  <div className="space-y-6">
                    <h3 className="font-bold text-gray-900 text-xl">Billing History</h3>
                    <div className="space-y-4">
                      {billingHistory.map((bill, index) => (
                        <div key={index} className="flex items-center justify-between p-6 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl border border-gray-200 hover:shadow-lg transition-all duration-200">
                          <div className="flex items-center space-x-6">
                            <div className="bg-green-100 p-3 rounded-full">
                              <DollarSign className="w-6 h-6 text-green-600" />
                            </div>
                            <div>
                              <div className="font-semibold text-gray-900 text-lg">{bill.plan}</div>
                              <div className="text-sm text-gray-600 flex items-center mt-1">
                                <Calendar className="w-4 h-4 mr-1" />
                                {bill.date} • Invoice: {bill.invoice}
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center space-x-4">
                            <span className="font-bold text-gray-900 text-xl">{bill.amount}</span>
                            <Badge className="bg-green-100 text-green-800 px-3 py-1">
                              {bill.status}
                            </Badge>
                            <Button variant="outline" size="sm">
                              <Download className="w-4 h-4 mr-2" />
                              Download Invoice
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
