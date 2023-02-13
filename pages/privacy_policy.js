import React from 'react'
import {Flex,Text,Heading,Link} from '@chakra-ui/react'
import Header from '../components/Header.js';

export default function privacy_policy(){
	return(
		<Flex direction='column'>
			<Header/>
			<Flex direction='column' gap='2' p='2'>
			<Heading textAlign='center'>PRIVACY POLICY</Heading>

			<Text>We at Prokem Specialty (ProKemia) respect your privacy. This Privacy Policy is established to inform the users of ProKemia (Prokem Specialty, ProKemia, “the Company” “We”, “Us”) Website, App and services of collection, processing, sharing and storing of your personal data.</Text>
			<Text>We are committed to conducting our business in accordance with these principles in order to ensure that the privacy of personal information is protected and maintained. Unless stated otherwise, this Privacy Policy applies when you visit or use the Company website, App or services (our platforms). By accessing the platforms, you agree to be bound by the terms of this Privacy Policy</Text>
			<Text>This statement should be read together with the applicable data protection laws and regulations and the Terms and Conditions of ProKemia’s services and App. </Text>
			<Text fontWeight='bold'>UPDATE MESSAGE: This Terms & Conditions Policy was last updated on 11th February 2023.</Text>

			<Text mt='1' fontWeight='bold' fontSize='20px'> Our Responsibilities</Text>
			<Text>It is the policy of The Company to maintain an environment that promotes ethical and responsible conduct in all online network activities. The Company recognizes its legal and ethical obligation to protect your personal information and Data in that regard. To this end, The Company reserves the right and recognizes its obligation to:</Text>
			<Flex direction='column' gap='1'>
				{responsibility.map((text)=>{return(<Text key={text.id}>-{text}</Text>)})}
			</Flex>
			<Text mt='1' fontWeight='bold' fontSize='20px'>Data Collection</Text>
			<Text>We collect certain data from you directly, like information you enter yourself, data about your participation in our platform including from third party platforms you connect with The Company. We also use third party analytics to collect some data, like information about your device.</Text>

			<Text mt='1' fontWeight='bold' fontSize='20px'>Data You Provide </Text>
			<Text>We may collect different data from or about you depending on how you use the Services. When you create an account and use the Services, we collect personal information which includes any information about you from which you can be identified. The categories of Personal Information about you that we may collect, use, store or transfer (subject to your consent and/ requirements under applicable law) includes the following, some of which constitute Personal Information only when combined with personal identifiers:</Text>
			<Flex direction='column' gap='1'>
				{data.map((text)=>{return(<Text key={text.id}>-{text}</Text>)})}
			</Flex>

			<Text mt='1' fontWeight='bold' fontSize='20px'>How We Get Data about You</Text>
			<Text>We use tools like cookies, web beacons, analytical services to analyze trends and administer the website, track users’ movement around the websites and to gather data referenced above.</Text>

			<Text mt='1' fontWeight='bold' fontSize='20px'>Purpose of Information</Text>
			<Text>Before or at the time of collecting personal information, we will identify the purposes for which information is being collected. These include but not limited to:</Text>
			<Flex direction='column' gap='1'>
				{purposeofinformation.map((text)=>{return(<Text key={text.id}>-{text}</Text>)})}
			</Flex>

			<Text mt='1' fontWeight='bold' fontSize='20px'>Information Sharing and Disclosure</Text>
			<Text>Depending on usage, we may share certain data about you with our business partners, analytics and data enrichment providers, your social media providers, companies helping us run promotions and surveys, and advertising companies who help us promote our Services. We may also share your data as needed for security, legal compliance, or as part of a corporate restructuring. Lastly, we can share data in other ways if it is aggregated or de-identified or with your consent. We may share your data with third parties under the following circumstances or as otherwise described in this Privacy Policy:</Text>
			<Flex direction='column' gap='1'>
				{InformationSharing.map((text)=>{return(<Text key={text.id}>-{text}</Text>)})}
			</Flex>

			<Text mt='1' fontWeight='bold' fontSize='20px'>Rights of users</Text>
			<Text>Subject to applicable laws, a user has the following rights;</Text>
			<Flex direction='column' gap='1'>
				{rightofusers.map((text)=>{return(<Text key={text.id}>-{text}</Text>)})}
			</Flex>

			<Text mt='1' fontWeight='bold' fontSize='20px'>Data Retention</Text>
			<Text>The Company retains personal data, as necessary, for the duration of the relevant business relationship. We may also retain personal data for longer than the duration of the business relationship should we need to retain it to protect ourselves against legal claims, use it for analysis or historical record-keeping, or comply with our information management policies and schedules. If you request that we delete your personal data, The Company will make reasonable attempts to delete all instances of the information in their entirety. For requests for access, corrections, or deletion, please refer to the “Your Rights” section of this Privacy Policy.</Text>
			
			<Text mt='1' fontWeight='bold' fontSize='20px'>Security of Information</Text>
			<Text>The Company has implemented generally accepted standards of technology and operational security to protect personal data from loss or theft, unauthorized access, disclosure, copying, use or modification, alteration, or destruction. Only authorized The Company personnel and third party service providers are provided access to personal data.  These employees and service providers are required to treat this information as confidential. All access to our Services is encrypted using industry-standard transport layer security technology (“TLS”). When you enter sensitive information, we encrypt the transmission of that information using secure socket layer technology (“SSL”). We also use HTTP strict transport security to add an additional layer of protection. Despite these precautions, The Company cannot guarantee that unauthorized persons will not obtain access to your personal data.</Text>
			
			<Text mt='1' fontWeight='bold' fontSize='20px'>Requesting your Personal Data</Text>
			<Text>Where granted by local law, you may have the right to request access to the personal data that we have collected about you for the purposes of reviewing, modifying, or requesting deletion of the data. You may also have the right to request a copy of the personal data that we have collected about you and to have any inaccuracies in that data corrected. In certain circumstances, you may also request that we cease processing your personal data.</Text>
			<Text>If you would like to make a request to access, review, or correct the personal data we have collected about you, or to discuss how we process your personal data, please contact us at app@prokemia.com To help protect your privacy and security, we will take reasonable steps to verify your identity, such as requiring a password and user ID, before granting access to your personal data. We will make reasonable attempts to promptly investigate, comply with, or otherwise respond to your requests as may be required by applicable law. Different laws may prevent us from providing access to your personal data or otherwise fully complying with your request depending upon the circumstances and the request, such as for example, where producing your information may reveal the identity of someone else. </Text>
			<Text>We reserve the right to charge an appropriate fee for complying with your request where allowed by applicable law, and/or deny your requests where they may be manifestly unfounded, and/or excessive, or otherwise objectionable or unwarranted under applicable law.</Text>
			<Text> In addition, and where granted by applicable law, you have the legal right to lodge a complaint with a competent data protection authority. You may also unsubscribe from mailing lists or any registrations with any of the Services by contacting us at the address provided at the bottom of this Privacy Policy.</Text>
			
			<Text mt='1' fontWeight='bold' fontSize='20px'>Personal information relating to a child</Text>
			<Text>The Company shall collect and process personal information relation to a child only when consent has been granted by the child’s parent or legal guardian or where the processing is in the best interests of the child. For purposes of this clause a child means persons as defined in the applicable laws of that country.</Text>
			
			<Text mt='1' fontWeight='bold' fontSize='20px'>Changes to our Privacy Policy</Text>
			<Text>We reserve the right to make changes to this Privacy Policy at any time and for any reason. You will be informed of any amendments to this Privacy Policy. You should check this page occasionally to review any changes. If we make material changes affecting you as determined by The Company we will notify you by posting the revised Privacy Policy on our website https://prokemia.com/privacy_policy and, if you are a registered user of our platform, by providing notice through the Company app or by email.</Text>
			<Text>The amendments to the Privacy Policy shall take effect from the date of publication on The Company’s website. You will be deemed to have been made aware of, will be subject to, and will be deemed to have accepted the changes in any revised Privacy Policy after the date such revised Privacy Policy is published on the Company website or when a notice is served through the app or by email.</Text>
			
			<Text mt='1' fontWeight='bold' fontSize='20px'>Contact Us</Text>
			<Text>Please send your feedback, comments, and requests for technical support by email: <Link color='#009393' href={`mailto: help@prokemia.com`} isExternal>help@prokemia.com</Link> or  +254 20 2525265</Text>
		</Flex>
		</Flex>
	)
}

const responsibility=
[
	"log network use and to monitor file server space utilization by Users, and assume no responsibility or liability for files deleted due to violation of file server space allotments;",
	"remove a user account on the network;",
	"monitor the use of online activities. This may include real-time monitoring of network activity and/or maintaining a log of Internet activity for later review;",
	"provide internal and external controls as appropriate and feasible including the right to determine who will have access to our platforms and, specifically, to exclude those who do not abide by this Privacy Policy or our Terms  and conditions; and ",
	"restrict online destinations through software or other means.",
]

const data=
[
	"Identity Data: Information we use to identify you, authenticate you as an authorized user of the Services, communicate with you, and record any transactions you make. This includes first name, maiden name, last name, login/user ID and password details, marital status, title, data of birth and gender.",
	"Contact Data: Includes billing address, postal address, email address, telephone number and mobile phone number.",
	"Technical Data: Includes internet protocol (IP) address, your login data, browser type and version, time zone setting and location, browser plug-in types and versions, operating system and platform and other technology on the devices you use to access our Services.",
	"Usage Data: Includes information about how you use our Services.",
	"Transaction Data: Includes details of the Services for which you have previously registered and/or in which you have been enrolled.",
	"Assessment Data: Information on your aptitude in certain technology-based subject areas and your performance on capabilities and learning needs assessments.",
	"Profile Data: Includes your interests, preferences, website browsing history, demographic information such as age, gender, education level, feedback and survey responses.",
	"Marketing, Communications and Support Data: Includes your preferences with respect to receiving marketing from us and/or our third party partners and your communication preferences. If you contact us for support or to report a problem or concern (regardless of whether you have created an account), we collect and store your contact information, messages, and other data about you like your name, email address, location, operating system, IP address, and any other data you provide or that we collect through automated means (which we cover below). We use this data to respond to you and research your question or concern, in accordance with this Privacy Policy."
]

const purposeofinformation=
[
	"identify the user/user account, give the user access to complete the registration process on the portal and access our Services",
	"enable and deliver the Services",
	"to manage our relationship with you",
	"promptly inform the user of any updates or changes to our policies and services,",
	"furnish the user with feedback on their participation and performance in the use of our Services",
	"grant the user access to the portal, to enable the user to complete and submit reviews and/or submit completed questionnaires/surveys.",
	"make our services and the portal’s content available to the user and also continue to modify, maintain and enhance the user’s experience",
	"intermittently upgrade the user experience and functionality of our Services while providing related customer services.",
	"manage and protect the Services (including troubleshooting, data analysis, testing, system review).",
	"endeavour to respond to the users’ queries/enquiries and forward information requested by the user via electronic mail, sms or other marketing channels."
]

const InformationSharing=
[
	"With Service Providers, Contractors, and Agents: We share your data with third party companies who perform services on our behalf, like data analysis, marketing and advertising services (including retargeted advertising), email and hosting services. These service providers may access your personal data and are required to use it solely as we direct, to provide our requested service.",
	"With Business Partners: We have agreements with other websites and platforms to distribute our Services and drive traffic to The Company.",
	"With Analytics and Data Enrichment Services: As part of our use of third party analytics, we share certain contact information and data or de-identified data as needed. De-identified data means data where we have removed things like your name and email address and replaced it with a token ID. This allows these providers to provide analytics services or match your data with publicly-available database information (including contact and social information from other sources). We do this to communicate with you in a more effective and customized manner.",
	"To Administer Promotions and Surveys: we may share your data as necessary to administer, market, or sponsor promotions and surveys you choose to participate in, as required by applicable law, or in accordance with the rules of the promotion or survey.",
	"For Advertising:  We may use and share certain Data with third party advertisers and networks to show general demographic and preference information among our users",
	"For Security and Legal Compliance: We may disclose your data to third parties in good faith if we believe that the disclosure is: Permitted or required by law; Requested as part of a judicial, governmental, or legal inquiry, order, or proceeding; Reasonably necessary as part of a valid subpoena, warrant, or other legally-valid request; reasonably necessary to enforce our Terms of Service, Privacy Policy, and other legal agreements; required to detect, prevent, or address fraud, abuse, misuse, potential violations of law (or rule or regulation), or security or technical issues; or Reasonably necessary in our discretion to protect against imminent harm to the rights, property, or safety of The Company, our users, employees, members of the public, or our Services and to our auditors and legal advisors in order to assess our disclosure obligations and rights under this Privacy Policy",
	"During a Change in Control: If the Company undergoes a business transaction like a merger, acquisition, corporate divestiture, or dissolution (including bankruptcy), or a sale of all or some of its assets, we may share, disclose, or transfer all of your data to the successor organization during such transition or in contemplation of a transition (including during due diligence).",
	"After Aggregation/De-identification: We can disclose or use aggregate or de-identified data for any purpose.",
	" With Your Permission: With your consent, we may share data to third parties outside the scope of this Privacy Policy.",
]

const rightofusers=
[
	"The right to be informed of the use to which their personal data is to be put;",
	"The right to access their personal data; ",
	"The right to object to the processing of all or part of their personal data;",
	"The right to correction of inaccurate or incomplete data;",
	"Right to object and withdraw your consent to processing of your personal data except where required by law.",
	"The right to deletion of false or misleading data about them.",
]