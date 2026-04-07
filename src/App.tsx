import { useState, FormEvent } from "react";
import { 
  Instagram, 
  Youtube, 
  Facebook, 
  Send, 
  MessageCircle, 
  CreditCard, 
  ExternalLink, 
  TrendingUp, 
  ShieldCheck, 
  Zap,
  ShoppingBag,
  X,
  CheckCircle2
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

const OWNER_WHATSAPP = "918955932061";
const OWNER_UPI = "8955932061@axl";

const services = [
  {
    title: "Instagram Services",
    icon: <Instagram className="w-6 h-6 text-pink-500" />,
    items: [
      { name: "Followers", price: "₹129 / 1K", amount: 129 },
      { name: "Followers (Budget)", price: "₹99 / 1K", amount: 99 },
      { name: "Likes", price: "₹29 / 1K", amount: 29 },
      { name: "Saves", price: "₹9 / 1K", amount: 9 },
      { name: "Shares", price: "₹5 / 1K", amount: 5 },
      { name: "Comments", price: "₹99 / 1K", amount: 99 },
      { name: "Repost", price: "₹47 / 1K", amount: 47 },
      { name: "Story Views", price: "₹49 / 1K", amount: 49 },
      { name: "1 Million Views", price: "₹399 / 1M", amount: 399 },
    ],
    color: "border-pink-500/20 hover:border-pink-500/50",
    bg: "bg-pink-500/5"
  },
  {
    title: "YouTube Services",
    icon: <Youtube className="w-6 h-6 text-red-500" />,
    items: [
      { name: "Subscribers", price: "₹1000 / 1K", amount: 1000 },
      { name: "Views", price: "₹299 / 1K", amount: 299 },
      { name: "Likes", price: "₹199 / 1K", amount: 199 },
      { name: "Comments", price: "₹149 / 1K", amount: 149 },
    ],
    color: "border-red-500/20 hover:border-red-500/50",
    bg: "bg-red-500/5"
  },
  {
    title: "Facebook Services",
    icon: <Facebook className="w-6 h-6 text-blue-500" />,
    items: [
      { name: "Followers", price: "₹61 / 1K", amount: 61 },
      { name: "Views", price: "₹9 / 1K", amount: 9 },
      { name: "Reactions", price: "₹19 / 1K", amount: 19 },
      { name: "Comments", price: "Coming Soon", special: true, amount: 0 },
    ],
    color: "border-blue-500/20 hover:border-blue-500/50",
    bg: "bg-blue-500/5"
  },
  {
    title: "Telegram Services",
    icon: <Send className="w-6 h-6 text-sky-500" />,
    items: [
      { name: "Members", price: "₹30 / 1K", amount: 30 },
    ],
    color: "border-sky-500/20 hover:border-sky-500/50",
    bg: "bg-sky-500/5"
  },
];

export default function App() {
  const [selectedService, setSelectedService] = useState<any>(null);
  const [formData, setFormData] = useState({
    link: "",
    mobile: "",
    transactionId: "",
    referralCode: "",
    quantity: "1000"
  });

  const handleServiceClick = (service: any, category: string) => {
    if (service.special) return;
    setSelectedService({ ...service, category });
  };

  const getUpiUrl = (scheme: string = "upi") => {
    if (!selectedService) return "";
    const baseUrl = `${scheme}://pay`;
    const params = new URLSearchParams({
      pa: OWNER_UPI,
      pn: "TrendzyHubX",
      am: selectedService.amount.toString(),
      cu: "INR",
      tn: `Order_${selectedService.name.replace(/\s+/g, '_')}`
    });
    return `${baseUrl}?${params.toString()}`;
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    alert("UPI ID Copied! Now you can pay manually from any app.");
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    
    const message = `*New Order from TrendzyHubX*%0A%0A` +
      `*Service:* ${selectedService.category} - ${selectedService.name}%0A` +
      `*Amount:* ₹${selectedService.amount}%0A` +
      `*Quantity:* ${formData.quantity}%0A` +
      `*Link:* ${formData.link}%0A` +
      `*Mobile:* ${formData.mobile}%0A` +
      `*Transaction ID:* ${formData.transactionId}%0A` +
      `*Referral Code:* ${formData.referralCode || "None"}`;
    
    const whatsappUrl = `https://wa.me/${OWNER_WHATSAPP}?text=${message}`;
    
    // Create a temporary link and click it for better compatibility
    const link = document.createElement('a');
    link.href = whatsappUrl;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setSelectedService(null);
    setFormData({ link: "", mobile: "", transactionId: "", referralCode: "", quantity: "1000" });
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 font-sans selection:bg-emerald-500/30">
      {/* Header */}
      <header className="sticky top-0 z-50 backdrop-blur-md bg-slate-950/80 border-b border-slate-800">
        <div className="max-w-4xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-slate-950" />
            </div>
            <div className="flex flex-col">
              <h1 className="text-xl font-bold tracking-tight text-white leading-none">TrendzyHubX</h1>
              <span className="text-[8px] font-black text-emerald-500 uppercase tracking-tighter">Managed by GAUTAM TIWARI</span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <span className="hidden sm:inline-flex items-center gap-1 text-xs font-medium text-emerald-500 bg-emerald-500/10 px-2 py-1 rounded-full">
              <Zap className="w-3 h-3" /> Fast Delivery
            </span>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8 space-y-12">
        {/* Hero */}
        <section className="text-center space-y-4 py-8">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight"
          >
            Boost Your <span className="text-emerald-500">Social Presence</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-slate-400 max-w-xl mx-auto text-lg"
          >
            Premium quality services at unbeatable prices. Click on any service to pay and order instantly.
          </motion.p>
        </section>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {services.map((section, idx) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.1 }}
              className={`p-6 rounded-2xl border ${section.color} ${section.bg} transition-all duration-300 group`}
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 rounded-xl bg-slate-900 border border-slate-800 group-hover:scale-110 transition-transform">
                  {section.icon}
                </div>
                <h3 className="text-xl font-bold text-white">{section.title}</h3>
              </div>
              <div className="space-y-3">
                {section.items.map((item) => (
                  <div
                    key={item.name}
                    className="w-full flex justify-between items-center py-3 px-4 rounded-xl border border-slate-800/50 bg-slate-900/30 group/item transition-all"
                  >
                    <div className="flex flex-col">
                      <span className="text-slate-300 font-medium group-hover/item:text-white transition-colors">{item.name}</span>
                      <span className={`font-bold text-sm ${item.special ? 'text-slate-500 italic' : 'text-emerald-400'}`}>
                        {item.price}
                      </span>
                    </div>
                    {!item.special && (
                      <button
                        onClick={() => handleServiceClick(item, section.title)}
                        className="px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-black rounded-lg transition-all flex items-center gap-1.5 shadow-lg shadow-emerald-500/10 active:scale-95"
                      >
                        BUY NOW <Zap className="w-3 h-3 fill-current" />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </motion.div>
          ))}

          {/* Extra Services Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
            className="p-6 rounded-2xl border border-emerald-500/20 bg-emerald-500/5 md:col-span-2 flex flex-col sm:flex-row items-center justify-between gap-6"
          >
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-emerald-500/20">
                <ShoppingBag className="w-8 h-8 text-emerald-500" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">Extra Services</h3>
                <p className="text-slate-400">Instagram & YouTube Channel Buy & Sell</p>
              </div>
            </div>
            <a 
              href={`https://wa.me/${OWNER_WHATSAPP}?text=Hi, I am interested in Buying/Selling Instagram/YouTube channels.`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-8 py-3 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-xl transition-colors flex items-center justify-center gap-2"
            >
              Inquire Now <ExternalLink className="w-4 h-4" />
            </a>
          </motion.div>

          {/* Earning Section */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 }}
            className="p-8 rounded-3xl border border-emerald-500/30 bg-gradient-to-br from-emerald-500/10 to-transparent md:col-span-2 flex flex-col items-center text-center gap-6"
          >
            <div className="space-y-2">
              <h3 className="text-3xl font-black text-white uppercase tracking-tighter">Start Your Earning Now!</h3>
              <p className="text-slate-400 max-w-md mx-auto">Join our reseller program and start making money by providing social media services to others.</p>
            </div>
            <a 
              href={`https://wa.me/${OWNER_WHATSAPP}?text=Hi, I want to start earning with TrendzyHubX. Please guide me about the reseller program.`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-12 py-4 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black rounded-2xl transition-all flex items-center justify-center gap-3 shadow-xl shadow-emerald-500/20 group"
            >
              START EARNING NOW <Zap className="w-5 h-5 fill-current group-hover:scale-125 transition-transform" />
            </a>
          </motion.div>
        </div>

        {/* Order Details Modal */}
        <AnimatePresence>
          {selectedService && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-sm">
              <motion.div 
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                className="bg-slate-900 border border-slate-800 p-6 rounded-3xl w-full max-w-md shadow-2xl space-y-6 relative max-h-[90vh] overflow-y-auto scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-transparent"
              >
                <button 
                  onClick={() => setSelectedService(null)}
                  className="absolute top-4 right-4 text-slate-500 hover:text-white transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>

                <div className="text-center space-y-2">
                  <div className="w-16 h-16 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CreditCard className="w-8 h-8 text-emerald-500" />
                  </div>
                  <h3 className="text-2xl font-bold text-white">Complete Payment</h3>
                  <p className="text-slate-400 text-sm">
                    Select your preferred UPI app to pay ₹{selectedService.amount}
                  </p>
                </div>

                {/* App Selection Grid */}
                <div className="grid grid-cols-2 gap-3">
                  <a 
                    href={getUpiUrl("phonepe")}
                    className="flex flex-col items-center justify-center p-4 rounded-2xl bg-slate-950 border border-slate-800 hover:border-purple-500/50 hover:bg-purple-500/5 transition-all group"
                  >
                    <div className="w-10 h-10 bg-purple-600 rounded-xl flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                      <span className="text-white font-black text-xs">PP</span>
                    </div>
                    <span className="text-xs font-bold text-slate-300">PhonePe</span>
                  </a>
                  <a 
                    href={getUpiUrl("googlepay")}
                    className="flex flex-col items-center justify-center p-4 rounded-2xl bg-slate-950 border border-slate-800 hover:border-blue-500/50 hover:bg-blue-500/5 transition-all group"
                  >
                    <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                      <span className="text-white font-black text-xs">GP</span>
                    </div>
                    <span className="text-xs font-bold text-slate-300">Google Pay</span>
                  </a>
                  <a 
                    href={getUpiUrl("paytmmp")}
                    className="flex flex-col items-center justify-center p-4 rounded-2xl bg-slate-950 border border-slate-800 hover:border-sky-500/50 hover:bg-sky-500/5 transition-all group"
                  >
                    <div className="w-10 h-10 bg-sky-600 rounded-xl flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                      <span className="text-white font-black text-xs">PT</span>
                    </div>
                    <span className="text-xs font-bold text-slate-300">Paytm</span>
                  </a>
                  <a 
                    href={getUpiUrl("upi")}
                    className="flex flex-col items-center justify-center p-4 rounded-2xl bg-slate-950 border border-slate-800 hover:border-emerald-500/50 hover:bg-emerald-500/5 transition-all group"
                  >
                    <div className="w-10 h-10 bg-emerald-600 rounded-xl flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                      <Zap className="text-white w-5 h-5" />
                    </div>
                    <span className="text-xs font-bold text-slate-300">Other Apps</span>
                  </a>
                </div>

                {/* QR Code & Copy UPI */}
                <div className="flex flex-col items-center gap-4 py-4 bg-slate-950 rounded-2xl border border-slate-800">
                  <div className="text-center space-y-1 mb-2">
                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Or Scan QR Code</span>
                  </div>
                  <img 
                    src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=upi://pay?pa=${OWNER_UPI}%26pn=TrendzyHubX%26am=${selectedService.amount}%26cu=INR`} 
                    alt="UPI QR Code"
                    className="w-32 h-32 rounded-lg border-4 border-white shadow-lg shadow-emerald-500/10"
                  />
                  <div className="flex flex-col items-center gap-2 w-full px-6">
                    <button 
                      type="button"
                      onClick={() => copyToClipboard(OWNER_UPI)}
                      className="w-full flex items-center justify-center gap-2 text-sm font-bold text-emerald-500 bg-emerald-500/10 px-4 py-3 rounded-xl border border-emerald-500/20 hover:bg-emerald-500/20 transition-all"
                    >
                      Copy UPI ID <CreditCard className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800">
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-slate-500">Selected Service</span>
                    <span className="text-emerald-500 font-bold">₹{selectedService.amount}</span>
                  </div>
                  <p className="text-white font-bold">{selectedService.category} - {selectedService.name}</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Profile/Post Link</label>
                    <input 
                      required
                      type="url"
                      placeholder="https://instagram.com/..."
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 focus:outline-none focus:border-emerald-500 transition-colors"
                      value={formData.link}
                      onChange={(e) => setFormData({ ...formData, link: e.target.value })}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Quantity</label>
                      <input 
                        required
                        type="number"
                        placeholder="1000"
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 focus:outline-none focus:border-emerald-500 transition-colors"
                        value={formData.quantity}
                        onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Mobile Number</label>
                      <input 
                        required
                        type="tel"
                        placeholder="9876543210"
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 focus:outline-none focus:border-emerald-500 transition-colors"
                        value={formData.mobile}
                        onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                      />
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Transaction ID (UTR)</label>
                      <input 
                        required
                        type="text"
                        placeholder="Enter 12-digit UTR number"
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 focus:outline-none focus:border-emerald-500 transition-colors"
                        value={formData.transactionId}
                        onChange={(e) => setFormData({ ...formData, transactionId: e.target.value })}
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Referral Code (Optional)</label>
                      <input 
                        type="text"
                        placeholder="Enter referral code if any"
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 focus:outline-none focus:border-emerald-500 transition-colors"
                        value={formData.referralCode}
                        onChange={(e) => setFormData({ ...formData, referralCode: e.target.value })}
                      />
                    </div>
                  </div>
                  <button 
                    type="submit"
                    className="w-full py-4 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20"
                  >
                    Submit to WhatsApp <MessageCircle className="w-5 h-5" />
                  </button>
                </form>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* Payment & Contact */}
        <section className="space-y-6 pt-8">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <a 
              href={`upi://pay?pa=${OWNER_UPI}&pn=TrendzyHubX&cu=INR`}
              className="flex flex-col items-center justify-center p-6 rounded-2xl bg-emerald-500 text-slate-950 hover:bg-emerald-400 transition-all group"
            >
              <CreditCard className="w-8 h-8 mb-3 group-hover:scale-110 transition-transform" />
              <span className="font-bold">Pay via UPI</span>
              <span className="text-xs opacity-80 mt-1 font-medium">Instant Payment</span>
            </a>
            <a 
              href={`https://wa.me/${OWNER_WHATSAPP}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center justify-center p-6 rounded-2xl bg-blue-600 text-white hover:bg-blue-500 transition-all group"
            >
              <MessageCircle className="w-8 h-8 mb-3 group-hover:scale-110 transition-transform" />
              <span className="font-bold">WhatsApp</span>
              <span className="text-xs opacity-80 mt-1 font-medium">Contact Support</span>
            </a>
            <a 
              href="https://www.instagram.com/gm.musicworld"
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center justify-center p-6 rounded-2xl bg-gradient-to-br from-purple-600 to-pink-600 text-white hover:opacity-90 transition-all group"
            >
              <Instagram className="w-8 h-8 mb-3 group-hover:scale-110 transition-transform" />
              <span className="font-bold">Instagram</span>
              <span className="text-xs opacity-80 mt-1 font-medium">Follow Us</span>
            </a>
          </div>
        </section>

        {/* Trust Badges */}
        <section className="flex flex-wrap justify-center gap-8 py-8 border-y border-slate-800">
          <div className="flex items-center gap-2 text-slate-400">
            <ShieldCheck className="w-5 h-5 text-emerald-500" />
            <span className="text-sm font-medium">Secure Payments</span>
          </div>
          <div className="flex items-center gap-2 text-slate-400">
            <Zap className="w-5 h-5 text-emerald-500" />
            <span className="text-sm font-medium">Instant Start</span>
          </div>
          <div className="flex items-center gap-2 text-slate-400">
            <MessageCircle className="w-5 h-5 text-emerald-500" />
            <span className="text-sm font-medium">24/7 Support</span>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 border-t border-slate-800 py-12">
        <div className="max-w-4xl mx-auto px-4 text-center space-y-6">
          <div className="flex items-center justify-center gap-2">
            <TrendingUp className="w-6 h-6 text-emerald-500" />
            <span className="text-xl font-bold text-white">TrendzyHubX</span>
          </div>
          <div className="text-slate-400 text-sm space-y-2">
            <p className="text-emerald-500 font-bold tracking-widest uppercase text-xs">Managed by GAUTAM TIWARI</p>
            <p>Contact for more platform services</p>
            <p className="font-mono">WhatsApp: {OWNER_WHATSAPP}</p>
            <p className="font-mono">UPI: {OWNER_UPI}</p>
          </div>
          <p className="text-slate-600 text-xs">
            © {new Date().getFullYear()} TrendzyHubX Services. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
