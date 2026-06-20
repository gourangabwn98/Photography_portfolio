"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, ChevronRight, Calendar, Clock, Package, User, CreditCard } from "lucide-react";
import { pricingPackages, timeSlots } from "@/data";

type BookingData = {
  package:   string;
  date:      string;
  time:      string;
  firstName: string;
  lastName:  string;
  email:     string;
  phone:     string;
  message:   string;
};

const steps = [
  { id: 1, label: "Package",  icon: Package  },
  { id: 2, label: "Date & Time", icon: Calendar },
  { id: 3, label: "Details",  icon: User     },
  { id: 4, label: "Confirm",  icon: CreditCard },
];

// Generate next 30 available dates
function getAvailableDates() {
  const dates: string[] = [];
  const today = new Date();
  for (let i = 3; i < 60; i++) {
    const d = new Date(today);
    d.setDate(today.getDate() + i);
    if (d.getDay() !== 0) { // no Sundays (by appointment only)
      dates.push(d.toISOString().split("T")[0]);
    }
    if (dates.length >= 30) break;
  }
  return dates;
}

const availableDates = getAvailableDates();

// Pseudo-booked dates for UI realism
const bookedDates = new Set([availableDates[2], availableDates[5], availableDates[9], availableDates[14]]);

export default function BookingPage() {
  const [step, setStep] = useState(1);
  const [done, setDone] = useState(false);
  const [data, setData] = useState<BookingData>({
    package: "", date: "", time: "", firstName: "", lastName: "", email: "", phone: "", message: "",
  });

  const set = (field: keyof BookingData, val: string) =>
    setData((d) => ({ ...d, [field]: val }));

  const canNext = () => {
    if (step === 1) return !!data.package;
    if (step === 2) return !!data.date && !!data.time;
    if (step === 3) return !!data.firstName && !!data.lastName && !!data.email;
    return true;
  };

  const selectedPkg = pricingPackages.find((p) => p.id === data.package);

  const submit = () => {
    setDone(true);
  };

  if (done) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-24 dark:bg-obsidian bg-ivory px-4">
        <motion.div
          className="text-center max-w-md"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
        >
          <div className="w-20 h-20 border border-gold-400 flex items-center justify-center mx-auto mb-8">
            <Check size={32} className="text-gold-400" />
          </div>
          <span className="label-overline block mb-4">Booking Received</span>
          <h2 className="text-display-md dark:text-white text-obsidian mb-4">
            Thank you,<br /><em className="text-gold-400 not-italic">{data.firstName}.</em>
          </h2>
          <p className="text-warm-gray font-sans text-sm leading-relaxed mb-4">
            Your booking request for the <strong className="text-gold-400">{selectedPkg?.name}</strong> package on{" "}
            <strong className="dark:text-white text-obsidian">{data.date}</strong> at{" "}
            <strong className="dark:text-white text-obsidian">{data.time}</strong> has been received.
          </p>
          <p className="text-warm-gray font-sans text-sm">
            I&apos;ll confirm within 24 hours at {data.email}.
          </p>
          <div className="divider-gold my-8" />
          <button onClick={() => { setDone(false); setStep(1); setData({ package:"",date:"",time:"",firstName:"",lastName:"",email:"",phone:"",message:"" }); }}
            className="btn-ghost-dark"
          >
            Book Another Session
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <>
      {/* Header */}
      <section className="pt-36 pb-12 dark:bg-obsidian bg-ivory">
        <div className="container-luxury max-w-4xl">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <span className="label-overline block mb-5">Reserve Your Date</span>
            <h1 className="text-display-md dark:text-white text-obsidian">Book a Session</h1>
          </motion.div>
        </div>
      </section>

      {/* Progress */}
      <section className="py-8 dark:bg-obsidian bg-ivory border-b dark:border-white/5 border-obsidian/5 sticky top-16 z-30">
        <div className="container-luxury max-w-4xl">
          <div className="flex items-center justify-between">
            {steps.map((s, i) => (
              <div key={s.id} className="flex items-center gap-2 flex-1">
                <button
                  onClick={() => step > s.id && setStep(s.id)}
                  className={`flex items-center gap-2 group ${step >= s.id ? "cursor-pointer" : "cursor-default"}`}
                  disabled={step < s.id}
                >
                  <div className={`w-8 h-8 flex items-center justify-center border transition-all ${
                    step > s.id  ? "bg-gold-400 border-gold-400 text-obsidian" :
                    step === s.id ? "border-gold-400 text-gold-400" :
                    "border-warm-gray/30 text-warm-gray/30"
                  }`}>
                    {step > s.id ? <Check size={13} /> : <s.icon size={13} />}
                  </div>
                  <span className={`text-xs font-sans tracking-widest uppercase hidden sm:block ${
                    step >= s.id ? "dark:text-white text-obsidian" : "text-warm-gray/40"
                  }`}>{s.label}</span>
                </button>
                {i < steps.length - 1 && (
                  <div className={`flex-1 h-px mx-2 transition-all ${step > s.id ? "bg-gold-400/50" : "bg-warm-gray/15"}`} />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Step content */}
      <section className="section-pad dark:bg-obsidian bg-ivory">
        <div className="container-luxury max-w-4xl">
          <AnimatePresence mode="wait">
            {/* Step 1: Package */}
            {step === 1 && (
              <motion.div key="s1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.4 }}>
                <h2 className="text-display-md dark:text-white text-obsidian mb-10">Choose a package</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {pricingPackages.map((pkg) => (
                    <button
                      key={pkg.id}
                      onClick={() => set("package", pkg.id)}
                      className={`text-left p-6 border transition-all duration-300 ${
                        data.package === pkg.id
                          ? "border-gold-400 dark:bg-obsidian/80 bg-white"
                          : "dark:border-white/8 border-obsidian/8 dark:bg-charcoal bg-white hover:border-gold-400/40"
                      }`}
                    >
                      <div className="flex items-center justify-between mb-4">
                        <span className="font-display text-xl dark:text-white text-obsidian">{pkg.name}</span>
                        {data.package === pkg.id && <Check size={14} className="text-gold-400" />}
                      </div>
                      <p className="font-display text-2xl text-gold-400 mb-3">${pkg.price}</p>
                      <p className="text-warm-gray text-xs font-sans">{pkg.description}</p>
                      <div className="mt-4 pt-4 border-t dark:border-white/6 border-obsidian/6 flex gap-4 text-xs text-warm-gray font-sans">
                        <span>{pkg.hours}h</span>
                        <span>{pkg.images} imgs</span>
                      </div>
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Step 2: Date & Time */}
            {step === 2 && (
              <motion.div key="s2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.4 }}>
                <h2 className="text-display-md dark:text-white text-obsidian mb-10">Select date & time</h2>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                  {/* Date */}
                  <div>
                    <label className="label-overline block mb-5">Available Dates</label>
                    <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                      {availableDates.slice(0, 24).map((d) => {
                        const booked = bookedDates.has(d);
                        const [, m, day] = d.split("-");
                        const monthNames = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
                        return (
                          <button
                            key={d}
                            disabled={booked}
                            onClick={() => set("date", d)}
                            className={`p-3 text-center border text-xs font-sans transition-all ${
                              booked ? "opacity-25 cursor-not-allowed dark:border-white/5 border-obsidian/5" :
                              data.date === d ? "border-gold-400 bg-gold-400 text-obsidian" :
                              "dark:border-white/10 border-obsidian/10 hover:border-gold-400/50 dark:text-white text-obsidian"
                            }`}
                          >
                            <p className="font-medium">{day}</p>
                            <p className="text-[10px] uppercase tracking-wide mt-0.5 opacity-60">{monthNames[parseInt(m) - 1]}</p>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                  {/* Time */}
                  <div>
                    <label className="label-overline block mb-5">Time Slots</label>
                    <div className="grid grid-cols-2 gap-2">
                      {timeSlots.map((t) => (
                        <button
                          key={t}
                          onClick={() => set("time", t)}
                          className={`p-3 text-center border text-xs font-sans transition-all ${
                            data.time === t
                              ? "border-gold-400 bg-gold-400 text-obsidian"
                              : "dark:border-white/10 border-obsidian/10 hover:border-gold-400/50 dark:text-white text-obsidian"
                          }`}
                        >
                          <Clock size={11} className="inline mr-1.5 opacity-60" />{t}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Step 3: Details */}
            {step === 3 && (
              <motion.div key="s3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.4 }}>
                <h2 className="text-display-md dark:text-white text-obsidian mb-10">Your details</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-2xl">
                  <div>
                    <label className="label-overline block mb-2">First Name *</label>
                    <input className="input-luxury" value={data.firstName} onChange={(e) => set("firstName", e.target.value)} placeholder="First name" required />
                  </div>
                  <div>
                    <label className="label-overline block mb-2">Last Name *</label>
                    <input className="input-luxury" value={data.lastName} onChange={(e) => set("lastName", e.target.value)} placeholder="Last name" required />
                  </div>
                  <div>
                    <label className="label-overline block mb-2">Email *</label>
                    <input className="input-luxury" type="email" value={data.email} onChange={(e) => set("email", e.target.value)} placeholder="you@example.com" required />
                  </div>
                  <div>
                    <label className="label-overline block mb-2">Phone</label>
                    <input className="input-luxury" type="tel" value={data.phone} onChange={(e) => set("phone", e.target.value)} placeholder="+1 (555) 000-0000" />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="label-overline block mb-2">Tell me about your vision</label>
                    <textarea
                      className="input-luxury resize-none"
                      rows={4}
                      value={data.message}
                      onChange={(e) => set("message", e.target.value)}
                      placeholder="What are you looking to capture? Location ideas, mood, special details..."
                    />
                  </div>
                </div>
              </motion.div>
            )}

            {/* Step 4: Confirm */}
            {step === 4 && (
              <motion.div key="s4" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.4 }}>
                <h2 className="text-display-md dark:text-white text-obsidian mb-10">Review & confirm</h2>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                  {/* Summary */}
                  <div className="p-8 border dark:border-white/8 border-obsidian/8 dark:bg-charcoal bg-white">
                    <h3 className="label-overline mb-6">Booking Summary</h3>
                    {[
                      { l: "Package",  v: selectedPkg?.name || "—" },
                      { l: "Price",    v: `$${selectedPkg?.price} starting` },
                      { l: "Date",     v: data.date || "—" },
                      { l: "Time",     v: data.time || "—" },
                      { l: "Name",     v: `${data.firstName} ${data.lastName}` },
                      { l: "Email",    v: data.email },
                      { l: "Phone",    v: data.phone || "—" },
                    ].map(({ l, v }) => (
                      <div key={l} className="flex justify-between py-3 border-b dark:border-white/5 border-obsidian/5 last:border-0">
                        <span className="text-warm-gray text-xs font-sans tracking-wider uppercase">{l}</span>
                        <span className="dark:text-white text-obsidian text-sm font-sans text-right">{v}</span>
                      </div>
                    ))}
                  </div>

                  {/* Payment note */}
                  <div>
                    <h3 className="label-overline mb-6">Payment</h3>
                    <div className="p-6 border border-gold-400/20 dark:bg-obsidian/50 bg-ivory mb-4">
                      <p className="text-warm-gray text-sm font-sans leading-relaxed">
                        A <strong className="text-gold-400">30% retainer</strong> secures your date. The balance is due two weeks before your session. I&apos;ll send a secure payment link via email within 24 hours of confirmation.
                      </p>
                    </div>
                    <div className="p-6 border dark:border-white/5 border-obsidian/5 dark:bg-charcoal bg-white">
                      <p className="text-warm-gray text-xs font-sans leading-relaxed">
                        By submitting, you agree to the cancellation policy outlined on the Services page. No hidden fees.
                      </p>
                    </div>

                    {data.message && (
                      <div className="mt-6">
                        <p className="label-overline mb-2">Your vision</p>
                        <p className="text-warm-gray text-sm font-sans italic leading-relaxed">&ldquo;{data.message}&rdquo;</p>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Navigation */}
          <div className="flex items-center justify-between mt-14 pt-10 border-t dark:border-white/8 border-obsidian/8">
            <button
              onClick={() => setStep((s) => s - 1)}
              disabled={step === 1}
              className="btn-ghost-dark disabled:opacity-30 disabled:cursor-not-allowed"
            >
              Back
            </button>

            {step < 4 ? (
              <button
                onClick={() => setStep((s) => s + 1)}
                disabled={!canNext()}
                className="btn-primary disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Continue <ChevronRight size={14} />
              </button>
            ) : (
              <button
                onClick={submit}
                className="btn-primary"
              >
                Confirm Booking <Check size={14} />
              </button>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
