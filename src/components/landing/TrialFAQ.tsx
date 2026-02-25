"use client";

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";

const FAQS = [
    {
        question: "What is Rentora and how does it work?",
        answer: "Rentora is a complete commerce platform that lets you start, grow, and manage a business. You can create an online store, sell across multiple channels, and manage products, inventory, payments, and shipping all in one place."
    },
    {
        question: "How much does Rentora cost?",
        answer: "Try Rentora free for 3 days, no credit card required. After your trial expires, choose a pricing plan that suits the size and stage of your business, starting at just ₹20/month for the first month."
    },
    {
        question: "Can I use my own domain name with Rentora?",
        answer: "Yes, you can use your own domain name with Rentora. If you have an existing domain name, you can connect it to Rentora from your store's admin. If you don't have one yet, you can buy one through Rentora or a third-party provider."
    },
    {
        question: "Do I need to be a designer or developer to use Rentora?",
        answer: "No, you don't need to be a designer or developer to use Rentora. Signing up for Rentora allows you to customize the look and feel of your store with the online store builder and themes, and add features with apps."
    }
];

export function TrialFAQ() {
    return (
        <section className="bg-white py-24">
            <div className="max-w-3xl mx-auto px-6">
                <h2 className="text-4xl font-bold text-slate-900 mb-12">Questions?</h2>

                <Accordion type="single" collapsible className="w-full">
                    {FAQS.map((faq, index) => (
                        <AccordionItem key={index} value={`item-${index}`} className="border-b border-slate-200">
                            <AccordionTrigger className="text-xl font-semibold text-slate-900 py-6 hover:no-underline hover:text-slate-700 text-left">
                                {faq.question}
                            </AccordionTrigger>
                            <AccordionContent className="text-lg text-slate-600 pb-6 leading-relaxed">
                                {faq.answer}
                            </AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>
            </div>
        </section>
    );
}
