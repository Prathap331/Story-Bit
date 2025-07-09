
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
  Download,
  ExternalLink
} from 'lucide-react';

const Profile = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('profile');
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+1 (555) 123-4567',
    youtubeLink: 'https://youtube.com/@johndoe',
    instagramLink: 'https://instagram.com/johndoe',
    facebookLink: 'https://facebook.com/johndoe',
    twitterLink: 'https://twitter.com/johndoe',
    billingAddress: '123 Main St, New York, NY 10001'
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

  const handleViewScript = (scriptId: number) => {
    navigate(`/script/${scriptId}`);
  };

  const handleUpgrade = () => {
    navigate('/pricing');
  };

  const downloadInvoice = (invoiceId: string) => {
    // Mock invoice download
    const content = `Invoice #${invoiceId}\nDate: ${new Date().toLocaleDateString()}\nAmount: $29.99\nPlan: Pro Monthly`;
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `invoice-${invoiceId}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // Mock data for scripts and subscriptions
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
      id: "INV-001",
      date: "2024-01-15",
      amount: "$29.99",
      plan: "Pro Monthly",
      status: "Paid"
    },
    {
      id: "INV-002",
      date: "2023-12-15",
      amount: "$29.99",
      plan: "Pro Monthly",
      status: "Paid"
    },
    {
      id: "INV-003",
      date: "2023-11-15",
      amount: "$29.99",
      plan: "Pro Monthly",
      status: "Paid"
    }
  ];

  const menuItems = [
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
          <h1 className="text-3xl font-bold text-gray-900 mb-2">My Profile</h1>
          <p className="text-gray-600">Manage your account settings and view your content</p>
        </div>

        <div className="flex gap-8">
          {/* Left Navigation */}
          <div className="w-64 space-y-2">
            <Card className="shadow-lg">
              <CardContent className="p-4">
                <nav className="space-y-2">
                  {menuItems.map((item) => {
                    const Icon = item.icon;
                    return (
                      <button
                        key={item.id}
                        onClick={() => setActiveTab(item.id)}
                        className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors ${
                          activeTab === item.id
                            ? 'bg-purple-100 text-purple-700 border border-purple-200'
                            : 'text-gray-600 hover:bg-gray-100'
                        }`}
                      >
                        <Icon className="w-5 h-5" />
                        <span className="font-medium">{item.label}</span>
                      </button>
                    );
                  })}
                </nav>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {activeTab === 'profile' && (
              <Card className="shadow-lg">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="flex items-center">
                        <User className="w-5 h-5 mr-2" />
                        Profile Information
                      </CardTitle>
                      <CardDescription>
                        Update your personal information and social links
                      </CardDescription>
                    </div>
                    {!isEditing ? (
                      <Button onClick={handleEdit} variant="outline">
                        <Edit className="w-4 h-4 mr-2" />
                        Edit
                      </Button>
                    ) : (
                      <div className="flex space-x-2">
                        <Button onClick={handleSave} size="sm">
                          <Save className="w-4 h-4 mr-2" />
                          Save
                        </Button>
                        <Button onClick={handleCancel} variant="outline" size="sm">
                          Cancel
                        </Button>
                      </div>
                    )}
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name">Full Name</Label>
                      <Input
                        id="name"
                        value={isEditing ? editData.name : profileData.name}
                        onChange={(e) => setEditData({...editData, name: e.target.value})}
                        disabled={!isEditing}
                        className={!isEditing ? 'bg-gray-50' : ''}
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={isEditing ? editData.email : profileData.email}
                        onChange={(e) => setEditData({...editData, email: e.target.value})}
                        disabled={!isEditing}
                        className={!isEditing ? 'bg-gray-50' : ''}
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone">Phone</Label>
                      <Input
                        id="phone"
                        value={isEditing ? editData.phone : profileData.phone}
                        onChange={(e) => setEditData({...editData, phone: e.target.value})}
                        disabled={!isEditing}
                        className={!isEditing ? 'bg-gray-50' : ''}
                      />
                    </div>
                    <div>
                      <Label htmlFor="youtube">YouTube Link</Label>
                      <Input
                        id="youtube"
                        value={isEditing ? editData.youtubeLink : profileData.youtubeLink}
                        onChange={(e) => setEditData({...editData, youtubeLink: e.target.value})}
                        disabled={!isEditing}
                        className={!isEditing ? 'bg-gray-50' : ''}
                      />
                    </div>
                    <div>
                      <Label htmlFor="instagram">Instagram Link</Label>
                      <Input
                        id="instagram"
                        value={isEditing ? editData.instagramLink : profileData.instagramLink}
                        onChange={(e) => setEditData({...editData, instagramLink: e.target.value})}
                        disabled={!isEditing}
                        className={!isEditing ? 'bg-gray-50' : ''}
                      />
                    </div>
                    <div>
                      <Label htmlFor="facebook">Facebook Link</Label>
                      <Input
                        id="facebook"
                        value={isEditing ? editData.facebookLink : profileData.facebookLink}
                        onChange={(e) => setEditData({...editData, facebookLink: e.target.value})}
                        disabled={!isEditing}
                        className={!isEditing ? 'bg-gray-50' : ''}
                      />
                    </div>
                    <div>
                      <Label htmlFor="twitter">Twitter Link</Label>
                      <Input
                        id="twitter"
                        value={isEditing ? editData.twitterLink : profileData.twitterLink}
                        onChange={(e) => setEditData({...editData, twitterLink: e.target.value})}
                        disabled={!isEditing}
                        className={!isEditing ? 'bg-gray-50' : ''}
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="billingAddress">Billing Address</Label>
                    <Input
                      id="billingAddress"
                      value={isEditing ? editData.billingAddress : profileData.billingAddress}
                      onChange={(e) => setEditData({...editData, billingAddress: e.target.value})}
                      disabled={!isEditing}
                      className={!isEditing ? 'bg-gray-50' : ''}
                    />
                  </div>
                </CardContent>
              </Card>
            )}

            {activeTab === 'scripts' && (
              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <FileText className="w-5 h-5 mr-2" />
                    My Scripts
                  </CardTitle>
                  <CardDescription>
                    View and manage your generated scripts
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {myScripts.map((script) => (
                      <div key={script.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900">{script.title}</h3>
                          <div className="flex items-center space-x-4 text-sm text-gray-600 mt-1">
                            <span>Created: {script.createdAt}</span>
                            <span>{script.words} words</span>
                            <Badge variant={script.status === 'Published' ? 'default' : 'secondary'}>
                              {script.status}
                            </Badge>
                          </div>
                        </div>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleViewScript(script.id)}
                        >
                          <ExternalLink className="w-4 h-4 mr-2" />
                          View Script
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {activeTab === 'subscription' && (
              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Crown className="w-5 h-5 mr-2 text-yellow-500" />
                    My Subscription
                  </CardTitle>
                  <CardDescription>
                    Manage your subscription and usage
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div>
                        <Label className="text-sm font-medium text-gray-600">Current Plan</Label>
                        <div className="flex items-center mt-1">
                          <Badge className="bg-purple-100 text-purple-800 mr-2">{subscriptionData.plan}</Badge>
                          <Badge variant={subscriptionData.status === 'Active' ? 'default' : 'secondary'}>
                            {subscriptionData.status}
                          </Badge>
                        </div>
                      </div>
                      <div>
                        <Label className="text-sm font-medium text-gray-600">Next Billing Date</Label>
                        <div className="flex items-center mt-1">
                          <Calendar className="w-4 h-4 mr-2 text-gray-500" />
                          <span className="text-gray-900">{subscriptionData.nextBilling}</span>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div>
                        <Label className="text-sm font-medium text-gray-600">Scripts Generated</Label>
                        <div className="mt-1">
                          <div className="text-2xl font-bold text-gray-900">
                            {subscriptionData.scriptsGenerated} / {subscriptionData.scriptsLimit}
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                            <div 
                              className="bg-purple-600 h-2 rounded-full" 
                              style={{ width: `${(subscriptionData.scriptsGenerated / subscriptionData.scriptsLimit) * 100}%` }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex space-x-4 mt-6">
                    <Button onClick={handleUpgrade}>Upgrade Plan</Button>
                    <Button variant="outline">Cancel Subscription</Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {activeTab === 'billing' && (
              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <CreditCard className="w-5 h-5 mr-2" />
                    Billing Details
                  </CardTitle>
                  <CardDescription>
                    View your billing history and download invoices
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <h3 className="font-semibold text-gray-900">Billing History</h3>
                    <div className="space-y-3">
                      {billingHistory.map((bill) => (
                        <div key={bill.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                          <div className="flex items-center space-x-4">
                            <DollarSign className="w-5 h-5 text-green-600" />
                            <div>
                              <div className="font-medium text-gray-900">{bill.plan}</div>
                              <div className="text-sm text-gray-600">{bill.date}</div>
                            </div>
                          </div>
                          <div className="flex items-center space-x-3">
                            <span className="font-semibold text-gray-900">{bill.amount}</span>
                            <Badge variant="default" className="bg-green-100 text-green-800">
                              {bill.status}
                            </Badge>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => downloadInvoice(bill.id)}
                            >
                              <Download className="w-4 h-4 mr-2" />
                              Invoice
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
