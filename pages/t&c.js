import React from 'react'
import {Flex,Text,Heading,Link} from '@chakra-ui/react'
function TC(){
	//console.log(prohibiteduses)
	return(
		<Flex direction='column'>
			<Flex direction='column' gap='2' p='2'>
			<Heading textAlign='center'>TERMS AND CONDITIONS</Heading>

			<Text>These Website Terms and Conditions (“Terms”, “Terms of Service”) contained herein on this webpage, shall govern your use of this website, including all pages within this website (“Website”) located here. <Link color='#009393' href='https://prokemia.com' isExternal>https://prokemia.com</Link> (together or individually “Service”) operated by Prokemia Specialty (“Company”, “we”, “our”, “us”).</Text>
			<Text>These Terms apply in full force and effect to your use of this Website and by using this Website, you expressly accept all terms and conditions contained herein in full. You must not use this Website, if you have any objection to any of these Website Terms and Conditions.</Text>
			<Text fontWeight='bold'>UPDATE MESSAGE: This Policy was last updated on 11th May 2023.</Text>
			<Text mt='1' fontWeight='bold' fontSize='20px'>Content</Text>
			<Text>The Content found on or through the Service is the property of the Company or used with permission from a third party. You may not distribute, modify, transmit, reuse, download, repost, copy, or use the said Content, whether in whole or in part, for commercial purposes or for personal gain, without prior written permission from us.</Text>
			<Text mt='1' fontWeight='bold' fontSize='20px'>Prohibited Uses</Text>
			<Text>You may use this Service only for lawful purposes.</Text>
			<Text>You agree not to use Service:</Text>
			<Flex direction='column' gap='1'>
				{prohibiteduses.map((text,index)=>{return(<Text key={index}>-{text}</Text>)})}
			</Flex>
			<Text mt='1' fontWeight='bold' fontSize='20px'>Accounts</Text>
			<Text>When you create an account with us, you guarantee that you are above at least the age of 18 years or older, and that the information you provide us is accurate, complete, and current at all times. Inaccurate, incomplete, or obsolete information may result in the immediate termination of your account on Service.</Text>
			<Text>You are responsible for maintaining the confidentiality of your account and password, including but not limited to the restriction of access to your computer and/or account. You agree to accept responsibility for any and all activities or actions that occur under your account and/or password, whether your password is with our Service or a third-party service. You must notify us immediately upon becoming aware of any breach of security or unauthorized use of your account.</Text>
			<Text>You may not use as a username the name of another person or entity or that is not lawfully available for use, a name or trademark that is subject to any rights of another person or entity other than you, without appropriate authorization. You may not use as a username any name that is offensive, vulgar or obscene.</Text>
			<Text>We reserve the right to refuse service, terminate accounts, remove or edit content, or cancel orders in our sole discretion.</Text>
			<Text mt='1' fontWeight='bold' fontSize='20px'>Intellectual Property Rights</Text>
			<Text>The Service and its original content (excluding Content provided by users), features and functionality are and will remain the exclusive property of the Company and its licensors. The Service is protected by copyright, trademark, and applicable laws of the relevant countries. Our trademarks may not be used in connection with any product or service without the prior written consent of the Company.</Text>
			<Text mt='1' fontWeight='bold' fontSize='20px'>Intellectual Property Rights</Text>
			<Text>You may provide us either directly at app@prokemia.com  or via third party sites and tools with information and feedback concerning errors, suggestions for improvements, ideas, problems, complaints, and other matters related to our Service (“Feedback”). </Text>
			<Text>You acknowledge and agree that:</Text>
			<Flex direction='column' gap='1'>
				{errorfeedback.map((text,index)=>{return(<Text key={index}>-{text}</Text>)})}
			</Flex>
			<Text>In the event the transfer of the ownership to the Feedback is not possible due to applicable mandatory laws, you grant Company and its affiliates an exclusive, transferable, irrevocable, free-of-charge, sub-licensable, unlimited and perpetual right to use (including copy, modify, create derivative works, publish, distribute and commercialize) Feedback in any manner and for any purpose.</Text>
			<Text mt='1' fontWeight='bold' fontSize='20px'>Links to Other Web Sites</Text>
			<Text>Our Service may contain links to third party web sites or services that are not owned or controlled by the company. The Company has no control over, and assumes no responsibility for the content, privacy policies, or practices of any third party web sites or services. We do not warrant the offerings of any of these entities/individuals or their websites.</Text>
			<Text>You acknowledge and agree that company shall not be responsible or liable, directly or indirectly, for any damage or loss caused or alleged to be caused by or in connection with use of or reliance on any such content, goods or services available on or through any such third party web sites or services. We strongly advise you to read the terms of service and privacy policies of any third party web sites or services that you visit.</Text>
			<Text mt='1' fontWeight='bold' fontSize='20px'>Rights to Content</Text>
			<Text>I hereby irrevocably authorize Company, its affiliates, collaborators and its representatives to copyright, publish, reproduce, exhibit, transmit, broadcast, televise, digitize, display, otherwise use, and permit others to use, (a) my name, image, likeness, and voice, and (b) all photographs, recordings, videotapes, audio-visual materials, writings, statements, and quotations of or by myself (collectively, the “Materials”), in any manner, form, or format whatsoever now or hereinafter created, including on the Internet, and for any purpose, including, but not limited to, advertising or promotion of Company, its affiliates, or their services, without further consent from or payment to me.</Text>
			<Text>It is understood that all of the Materials, and all films, audiotapes, videotapes, reproductions, media, plates, negatives, photocopies, and electronic and digital copies of the Materials, are the sole property of Company. I agree not to contest the rights or authority granted to Company hereunder.</Text>
			<Text>I hereby forever release and discharge Company, its employees, licensees, agents, successors, and assigns from any claims, actions, damages, liabilities, costs, or demands whatsoever arising by reason of defamation, invasion of privacy, right of publicity, copyright infringement, or any other personal or property rights from or related to any use of the Materials. I understand that Company is under no obligation to use the Materials.</Text>
			<Text mt='1' fontWeight='bold' fontSize='20px'>Disclaimer of warranty</Text>
			<Text>The Service is provided by the Company on an “as is” and “as available” basis. The Company makes no representations or warranties of any kind, express or implied, as to the operation of their service, or the information, content or materials included therein. You expressly agree that your use of the service, their content, and any services or items obtained from us is at your sole risk.</Text>
			<Text>Neither the Company nor any person associated with Company makes any warranty or representation with respect to the completeness, security, reliability, quality, accuracy, or availability of the services. Without limiting the foregoing, neither the Company nor anyone associated with Company represents or warrants that the services, their content, or any services or items obtained through the services will be accurate, reliable, error-free, or uninterrupted, that defects will be corrected, that the services or the server that makes it available are free of viruses or other harmful components or that the services or any services or items obtained through the services will otherwise meet your needs or expectations.</Text>
			<Text>The Company hereby disclaims all warranties of any kind, whether express or implied, statutory, or otherwise, including but not limited to any warranties of merchantability, non-infringement, and fitness for particular purpose. This does not affect any warranties which cannot be excluded or limited under applicable law.</Text>
			<Text mt='1' fontWeight='bold' fontSize='20px'>Limitation of Liability</Text>
			<Text>Except as prohibited by law, you will hold us and our officers, directors, employees, and agents harmless for any indirect, punitive, special, incidental, or consequential damage, however it arises (including attorneys’ fees and all related costs and expenses of litigation and arbitration, or at trial or on appeal, if any, whether or not litigation or arbitration is instituted), whether in an action of contract, negligence, or other tortious action, or arising out of or in connection with this agreement, including without limitation any claim for personal injury or property damage, arising from this agreement and any violation by you of any federal, state, or local laws, statutes, rules, or regulations, even if company has been previously advised of the possibility of such damage. Except as prohibited by law, if there is liability found on the part of the Company, it will be limited to the amount paid for the products and/or services, and under no circumstances will there be consequential or punitive damages. </Text>
			<Text mt='1' fontWeight='bold' fontSize='20px'>Indemnification</Text>
			<Text>You hereby indemnify to the fullest extent the Company from and against any and all liabilities, costs, demands, causes of action, damages and expenses (including reasonable attorney’s fees) arising out of or in any way related to your breach of any of the provisions of these Terms.</Text>
			<Text mt='1' fontWeight='bold' fontSize='20px'>Termination</Text>
			<Text>We may terminate or suspend your account and bar access to the Service immediately, without prior notice or liability, under our sole discretion, for any reason whatsoever and without limitation, including but not limited to a breach of Terms and Conditions.</Text>
			<Text>If you wish to terminate your account, you may simply discontinue using the Service by opting out.All provisions of Terms and Conditions which by their nature should survive termination shall survive termination, including, without limitation, ownership provisions, warranty disclaimers, indemnity and limitations of liability.</Text>
			<Text mt='1' fontWeight='bold' fontSize='20px'>Withdrawal of Service</Text>
			<Text>We reserve the right to withdraw or amend our Service, and any service or material we provide via Service, in our sole discretion without notice. We will not be liable if for any reason all or any part of Service is unavailable at any time or for any period. From time to time, we may restrict access to some parts of Service, or the entire Service, to users, including registered users.</Text>
			<Text mt='1' fontWeight='bold' fontSize='20px'>Amendments to Terms</Text>
			<Text>We may amend Terms at any time by posting the amended terms on this site. It is your responsibility to review these Terms periodically.</Text>
			<Text>have understood, accepted and agreed to the changes. You are expected to check this page frequently so you are aware of any changes, as they are binding on you.</Text>
			<Text>By continuing to access or use our Service after any revisions become effective, you agree to be bound by the revised terms. If you do not agree to the new terms, you are no longer authorized to use Service.</Text>
			<Text mt='1' fontWeight='bold' fontSize='20px'>Waiver and Severability</Text>
			<Text>No waiver by the Company of any term or condition set forth in Terms shall be deemed a further or continuing waiver of such term or condition or a waiver of any other term or condition, and any failure of Company to assert a right or provision under Terms shall not constitute a waiver of such right or provision.If any provision of Terms is held by a court or other tribunal of competent jurisdiction to be invalid, illegal or unenforceable for any reason, such provision shall be eliminated or limited to the minimum extent such that the remaining provisions of Terms will continue in full force and effect.</Text>
			<Text mt='1' fontWeight='bold' fontSize='20px'>Withdrawal of Service</Text>
			<Text>We reserve the right to withdraw or amend our Service, and any service or material we provide via Service, in our sole discretion without notice. We will not be liable if for any reason all or any part of Service is unavailable at any time or for any period. From time to time, we may restrict access to some parts of Service, or the entire Service, to users, including registered users.</Text>
			<Text mt='1' fontWeight='bold' fontSize='20px'>Governing Law</Text>
			<Text>These Terms shall be governed and construed in accordance with the laws of Kenya, which governing law applies to agreement without regard to its conflict of law provisions.These Terms constitute the entire agreement between us regarding our Service and supersede and replace any prior agreements we might have had between us regarding Service.</Text>			
			<Text mt='1' fontWeight='bold' fontSize='20px'>Acknowledgement</Text>
			<Text>By using service or other services provided by us, you acknowledge that you have read and understood these terms of service and agree to be bound by them.</Text>
			<Text mt='1' fontWeight='bold' fontSize='20px'>Contact Us</Text>
			<Text>Please send your feedback, comments, and requests for technical support by email: <Link color='#009393' href={`mailto: help@prokemia.com`} isExternal>help@prokemia.com</Link> or  +254 20 2525265</Text>
		</Flex>
		</Flex>
	)
}

export default TC;

const prohibiteduses=
[
	"In any way that violates any applicable national or international laws or regulations.",
	"For the purpose of exploiting, harming, or attempting to exploit or harm minors in any way by exposing them to inappropriate content or otherwise.",
	"To transmit, or procure the sending of, any advertising or promotional material, including any “junk mail”, “chain letter,” “spam,” or any other similar solicitation.",
	"To impersonate or attempt to impersonate the Company, a Company employee, another user, or any other person or entity.",
	"In any way that infringes upon the rights of others, or in any way is illegal, threatening, fraudulent, or harmful, or in connection with any unlawful, illegal, fraudulent, or harmful purpose or activity.",
	"To engage in any other conduct that restricts or inhibits anyone’s use or enjoyment of Service, or which, as determined by us, may harm or offend Company or users of Service or expose them to liability.",
	"Use Service in any manner that could disable, overburden, damage, or impair Service or interfere with any other party’s use of Service, including their ability to engage in real-time activities through Service.",
	"Use any robot, spider, or other automatic devices process, or means to access Service for any purpose, including monitoring or copying any of the material on Service. ",
	"Use any manual process to monitor or copy any of the material on Service or for any other unauthorized purpose without our prior written consent.",
	"Use any device, software, or routine that interferes with the proper working of Service.",
	"Introduce any viruses, trojan horses, worms, logic bombs, or other material which is malicious or technologically harmful.",
	"Attempt to gain unauthorized access to, interfere with, damage, or disrupt any parts of Service, the server on which Service is stored, or any server, computer, or database connected to Service",
	"Attack Service via a denial-of-service attack or a distributed denial-of-service attack.",
	"Take any action that may damage or falsify Company rating.",
	"Otherwise attempt to interfere with the proper working of Service."
]

const errorfeedback=
[
	"you shall not retain, acquire or assert any intellectual property right or other right, title or interest in or to the Feedback; ",
	"The Company may have development ideas similar to the Feedback; ",
	"The Feedback does not contain confidential information or proprietary information from you or any third party; and",
	"The Company is not under any obligation of confidentiality with respect to the Feedback.",
]