/**
 * Verbatim text of the live legal pages (rscprivatelending.com/privacy-notice and
 * /terms-of-service), approved 2026-10-07. Do not edit wording, dates, or contact details here:
 * only markup may differ from the source.
 */

export type LegalInline = string | { href: string; text: string };

export type LegalBlock =
  | { type: "h2" | "h3"; text: string }
  | { type: "p"; content: LegalInline[] }
  | { type: "ul"; items: LegalInline[][] }
  | { type: "address"; lines: string[] };

export type LegalDocument = {
  title: string;
  dateLine: string;
  intro: string;
  blocks: LegalBlock[];
};

export const privacyPolicy: LegalDocument = {
  title: "Privacy Policy",
  dateLine: "Effective Date: April 01, 2025",
  intro: "Your privacy is important to us. This policy describes how we collect, use, and protect your information.",
  blocks: [
    {
      type: "p",
      content: [
        "This policy describes Red Sun Capital, LLC d/b/a RSC Private Lending (\"RSC Private Lending,\" \"we\" or \"our\") collection, processing, transfer, and storage of data from visitors to our website (our \"Website\"). This Privacy Policy applies only to the data collected on the Website and not to other data collected or processed by RSC Private Lending."
      ]
    },
    {
      type: "h2",
      text: "1. Our Commitment to Your Privacy"
    },
    {
      type: "p",
      content: [
        "This Privacy Policy describes:"
      ]
    },
    {
      type: "ul",
      items: [
        [
          "How information about you is collected through our Website;"
        ],
        [
          "How we use and with whom we share this information;"
        ],
        [
          "How you can access and update this information; and"
        ],
        [
          "The choices you can make about how we collect, use and share your information."
        ]
      ]
    },
    {
      type: "p",
      content: [
        "If you have any questions regarding this Privacy Policy or our information collection and use practices, please contact us using the information in the \"Contact Us\" section below."
      ]
    },
    {
      type: "h2",
      text: "2. Information Collected Through Our Website"
    },
    {
      type: "p",
      content: [
        "RSC Private Lending collects information from Website visitors and also obtains information from third parties (including from service providers) in the course of providing our services (our \"Services\"), which we may add to the data we obtain through the Website. The information collected through our website includes:"
      ]
    },
    {
      type: "h3",
      text: "Personal and Investment-related Information."
    },
    {
      type: "p",
      content: [
        "You may provide us information about you, which may include personal information and information relating to or necessary for the initiation, processing, or completion of certain financial transactions, including the management of investments."
      ]
    },
    {
      type: "h3",
      text: "Transactional Information."
    },
    {
      type: "p",
      content: [
        "We may also create transactional records of each of the transactions or other events occurring through our Website. This transactional information is generally collected (i) to enable our Services, including investment document creation, origination, management, and distribution, (ii) to enable the services provided by third parties, and (iii) to enable RSC Private Lending to comply with various legal obligations."
      ]
    },
    {
      type: "h3",
      text: "Device and Usage Information."
    },
    {
      type: "p",
      content: [
        "Like most online services, our Website collects standard technical, non-personal information when you use it, including internet protocol (IP) addresses, browser types, internet service providers (ISPs), the pages and content you view or interact with on our Website, the information you search for, and the dates and times that you visit our Website."
      ]
    },
    {
      type: "h3",
      text: "Cookies and Other Technologies."
    },
    {
      type: "p",
      content: [
        "Our Website collects certain information through the use of \"cookies\" and other tracking technologies. Cookies are small files that your browser places on your computer. We may use session cookies, persistent cookies, and other tracking technologies to better understand how you interact with our Website, to monitor usage by our users and web traffic routing on our services, and to improve and personalize our Website. Many Internet browsers automatically accept cookies. You may be able to instruct your browser to stop accepting cookies or to prompt you before accepting cookies from the websites you visit. Google provides some additional privacy options relating to Google analytics, described at ",
        {
          href: "https://www.google.com/policies/privacy/partners/",
          text: "www.google.com/policies/privacy/partners/"
        },
        ". We do not respond to \"do not track\" browser signals at this time. We may also use web beacons, which are transparent graphic images on a webpage or within the body of one of our marketing emails, to allow us to measure visitor actions and assess the effectiveness of our email marketing campaigns."
      ]
    },
    {
      type: "h2",
      text: "3. How We Use Information"
    },
    {
      type: "p",
      content: [
        "We and service providers working on our behalf use information collected on our Website in a variety of ways intended to provide our Website and Services and to operate our business, including the following:"
      ]
    },
    {
      type: "h3",
      text: "To Provide our Services."
    },
    {
      type: "p",
      content: [
        "We use the information that we collect (i) to operate, maintain, enhance and provide our Website and our Services, (ii) to provide other services and information that you request, and (iii) to provide customer support to you and other parties."
      ]
    },
    {
      type: "h3",
      text: "To Improve, Analyze, and Personalize our Website and Services."
    },
    {
      type: "p",
      content: [
        "We use the information that we collect to understand and analyze usage trends and preferences; to monitor and analyze the effectiveness of our Website and Services; to improve our Website and Services and develop new products, services, features, and functionality; and to personalize our Website and Services, such as remembering your information so that you will not have to re-enter it during your visit or the next time you use our Website, or providing customized content and information."
      ]
    },
    {
      type: "h3",
      text: "To Contact You."
    },
    {
      type: "p",
      content: [
        "We may use your email address or other information we collect to contact you for administrative purposes such as customer service or to send communications, including marketing or promotional communications, relating to our Website and Services. Generally, you have the ability to opt out of receiving promotional communications as described below."
      ]
    },
    {
      type: "h3",
      text: "Aggregate Data."
    },
    {
      type: "p",
      content: [
        "We aggregate data collected through our Website and use it for purposes such as creating and sharing reports about the use of our products and services, including users' interests, usage patterns, and trends."
      ]
    },
    {
      type: "h3",
      text: "Advertising."
    },
    {
      type: "p",
      content: [
        "We may use non-identifiable information that you provide or that we collect to improve or tailor the effectiveness of advertising on our Website and to provide advertisements and other content that is tailored to you."
      ]
    },
    {
      type: "h2",
      text: "4. How We Share Information"
    },
    {
      type: "p",
      content: [
        "We may share, transfer, or disclose your information if you consent to us doing so, as well as in the following circumstances:"
      ]
    },
    {
      type: "h3",
      text: "To Service Providers."
    },
    {
      type: "p",
      content: [
        "We work with third-party service providers to provide services including transaction processing or administration; Website hosting and other similar services, development and maintenance; advertising and marketing services; and other services related to our Website and Services for us. These third parties may have access to or process your information as part of providing those services for us. Generally, we limit the information provided to these service providers to that which is reasonably necessary for them to perform their functions, and we require them to agree to maintain the confidentiality of such information. These service providers are not permitted to use information we share that might identify you for any purpose other than to provide services to RSC Private Lending or to you."
      ]
    },
    {
      type: "h3",
      text: "In Aggregate Form."
    },
    {
      type: "p",
      content: [
        "We may make certain aggregated non-personal information available to third parties for various purposes, including (i) compliance with various reporting obligations; (ii) for business or marketing purposes; or (iii) to assist such parties in understanding our users' interests, usage patterns, and investment trends."
      ]
    },
    {
      type: "h3",
      text: "Compliance with Laws and Law Enforcement; Protection of Our Rights."
    },
    {
      type: "p",
      content: [
        "We may disclose your information (including your personal information) to a third party if (a) we believe that disclosure is reasonably necessary to comply with any applicable law, regulation, legal process, or governmental request, (b) to enforce our agreements, policies, and terms of service, (c) to protect the security or integrity of our Website or Services, (d) to protect the property, rights, and safety of RSC Private Lending, our users, or the public from harm or illegal activities, (e) to respond to an emergency which we believe in good faith requires us to disclose information to assist in preventing the death or serious bodily injury of any person, or (f) to investigate and defend ourselves against any third-party claims or allegations."
      ]
    },
    {
      type: "h3",
      text: "In Significant Business Transactions."
    },
    {
      type: "p",
      content: [
        "Your information, including personal information, may be disclosed and otherwise transferred to an acquirer, successor, or assignee as part of any merger, acquisition, debt financing, sale of assets, or similar transaction, or in the event of an insolvency, bankruptcy, or receivership in which information is transferred to one or more third parties as one of our business assets."
      ]
    },
    {
      type: "h2",
      text: "5. Our Policy Concerning Children"
    },
    {
      type: "p",
      content: [
        "Our website is not directed to children under 13, and we do not knowingly collect any personal information from children under the age of 13 through our website. If we become aware that a child under 13 has provided us with personal information through our website, we will take steps to delete such information."
      ]
    },
    {
      type: "h2",
      text: "6. Privacy Policies of Linked Sites and Advertisers"
    },
    {
      type: "p",
      content: [
        "Our Website may contain links to other sites, as well as advertisements from companies linking to their own sites. We are not responsible for the privacy practices or the content of such sites. If you have any questions about how these other sites use your information, you should contact them directly."
      ]
    },
    {
      type: "h2",
      text: "7. Security"
    },
    {
      type: "p",
      content: [
        "RSC Private Lending has certain measures in place to maintain the security, confidentiality, and integrity of the information gathered through the Website, and to help protect against the loss, misuse, and alteration of such information. While we take measures to protect your personal information against security breaches and unauthorized access, we cannot guarantee that our safeguards will be effective all of the time against all security threats."
      ]
    },
    {
      type: "h2",
      text: "8. Changes to Our Privacy Policy"
    },
    {
      type: "p",
      content: [
        "This Privacy Policy may be revised from time to time. If we decide to make material changes to our Privacy Policy, we will make reasonable efforts to notify you of the changes by sending a notice to the primary email address provided to us and/or by placing a notice on our Website."
      ]
    },
    {
      type: "h2",
      text: "9. How to Access and Update Your Information"
    },
    {
      type: "p",
      content: [
        "You can access and update the information that you have provided to us as follows:"
      ]
    },
    {
      type: "ul",
      items: [
        [
          "If you are a client, you can access and update certain personal information in connection with your account by logging into your account online."
        ],
        [
          "You may contact us at ",
          {
            href: "mailto:info@rscprivatelending.com",
            text: "info@rscprivatelending.com"
          },
          " and request to review, amend, or delete certain personal information collected by us."
        ]
      ]
    },
    {
      type: "p",
      content: [
        "Please note that we may not be able to delete all information we collect through our Website."
      ]
    },
    {
      type: "p",
      content: [
        "You may opt-out of receiving marketing emails at any time by following the steps to \"unsubscribe\" described in the footer of our marketing emails. Your opt-out will become effective in 10 days or less."
      ]
    },
    {
      type: "h2",
      text: "10. Contact Us"
    },
    {
      type: "p",
      content: [
        "If you have any questions, comments or concerns regarding our Privacy Policy and/or practices, please send an email to: ",
        {
          href: "mailto:info@rscprivatelending.com",
          text: "info@rscprivatelending.com"
        }
      ]
    },
    {
      type: "address",
      lines: [
        "RSC Private Lending",
        "118 Vintage Park Blvd #W317",
        "Houston, TX 77070"
      ]
    }
  ]
};

export const termsOfService: LegalDocument = {
  title: "Terms of Service",
  dateLine: "Last Updated: April 01, 2025",
  intro: "Please review these terms carefully before using our website and services.",
  blocks: [
    {
      type: "h2",
      text: "1. Acceptance of Terms"
    },
    {
      type: "p",
      content: [
        "By accessing or using the RSC Private Lending website (\"https://www.rscprivatelending.com\") (\"the Website\"), you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using or accessing this site."
      ]
    },
    {
      type: "h2",
      text: "2. Use License"
    },
    {
      type: "p",
      content: [
        "Permission is granted to temporarily view the materials (information or software) on RSC Private Lending's website for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:"
      ]
    },
    {
      type: "ul",
      items: [
        [
          "Modify or copy the materials;"
        ],
        [
          "Use the materials for any commercial purpose, or for any public display (commercial or non-commercial);"
        ],
        [
          "Attempt to decompile or reverse engineer any software contained on RSC Private Lending's website;"
        ],
        [
          "Remove any copyright or other proprietary notations from the materials; or"
        ],
        [
          "Transfer the materials to another person or \"mirror\" the materials on any other server."
        ]
      ]
    },
    {
      type: "p",
      content: [
        "This license shall automatically terminate if you violate any of these restrictions and may be terminated by RSC Private Lending at any time. Upon terminating your viewing of these materials or upon the termination of this license, you must destroy any downloaded materials in your possession whether in electronic or printed format."
      ]
    },
    {
      type: "h2",
      text: "3. Disclaimer"
    },
    {
      type: "p",
      content: [
        "The materials on RSC Private Lending's website are provided on an 'as is' basis. RSC Private Lending makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights."
      ]
    },
    {
      type: "p",
      content: [
        "Further, RSC Private Lending does not warrant or make any representations concerning the accuracy, likely results, or reliability of the use of the materials on its website or otherwise relating to such materials or on any sites linked to this site."
      ]
    },
    {
      type: "h2",
      text: "4. Limitations"
    },
    {
      type: "p",
      content: [
        "In no event shall RSC Private Lending or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on RSC Private Lending's website, even if RSC Private Lending or an RSC Private Lending authorized representative has been notified orally or in writing of the possibility of such damage."
      ]
    },
    {
      type: "h2",
      text: "5. Accuracy of Materials"
    },
    {
      type: "p",
      content: [
        "The materials appearing on RSC Private Lending's website could include technical, typographical, or photographic errors. RSC Private Lending does not warrant that any of the materials on its website are accurate, complete or current. RSC Private Lending may make changes to the materials contained on its website at any time without notice. However RSC Private Lending does not make any commitment to update the materials."
      ]
    },
    {
      type: "h2",
      text: "6. Links"
    },
    {
      type: "p",
      content: [
        "RSC Private Lending has not reviewed all of the sites linked to its website and is not responsible for the contents of any such linked site. The inclusion of any link does not imply endorsement by RSC Private Lending of the site. Use of any such linked website is at the user's own risk."
      ]
    },
    {
      type: "h2",
      text: "7. Modifications"
    },
    {
      type: "p",
      content: [
        "RSC Private Lending may revise these terms of service for its website at any time without notice. By using this website you are agreeing to be bound by the then current version of these terms of service."
      ]
    },
    {
      type: "h2",
      text: "8. Governing Law"
    },
    {
      type: "p",
      content: [
        "These terms and conditions are governed by and construed in accordance with the laws of Hawaii and you irrevocably submit to the exclusive jurisdiction of the courts in that State or location."
      ]
    },
    {
      type: "h2",
      text: "9. Contact Information"
    },
    {
      type: "p",
      content: [
        "If you have any questions about these Terms of Service, please contact us at: ",
        {
          href: "mailto:info@rscprivatelending.com",
          text: "info@rscprivatelending.com"
        }
      ]
    },
    {
      type: "address",
      lines: [
        "RSC Private Lending",
        "118 Vintage Park Blvd #W317",
        "Houston, TX 77070"
      ]
    }
  ]
};
