import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const Terms = () => {
  return (
    <div className="container mx-auto py-8 px-4 max-w-4xl">
      <Card>
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-center">Terms of Service</CardTitle>
          <p className="text-center text-muted-foreground">Last updated: {new Date().toLocaleDateString()}</p>
        </CardHeader>
        <CardContent className="prose prose-slate max-w-none">
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">1. Agreement to Terms</h2>
            <p>
              By accessing or using Supa Chat Oasis, you agree to be bound by these Terms of Service and all applicable
              laws and regulations. If you do not agree with any of these terms, you are prohibited from using or
              accessing this site.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">2. Use License</h2>
            <p>
              Permission is granted to temporarily access and use Supa Chat Oasis for personal, non-commercial transitory
              viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:
            </p>
            <ul className="list-disc pl-6 mt-2">
              <li>Modify or copy the materials</li>
              <li>Use the materials for any commercial purpose</li>
              <li>Attempt to decompile or reverse engineer any software contained in Supa Chat Oasis</li>
              <li>Remove any copyright or other proprietary notations from the materials</li>
              <li>Transfer the materials to another person or "mirror" the materials on any other server</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">3. Account Terms</h2>
            <p>
              To access certain features of Supa Chat Oasis, you must create an account. You agree to:
            </p>
            <ul className="list-disc pl-6 mt-2">
              <li>Provide accurate, current, and complete information</li>
              <li>Maintain and update your information as needed</li>
              <li>Keep your password secure and confidential</li>
              <li>Be responsible for all activities that occur under your account</li>
              <li>Notify us immediately of any unauthorized use of your account</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">4. Ad Account Integration</h2>
            <p>
              When connecting Meta (Facebook) or Google Ads accounts, you agree to:
            </p>
            <ul className="list-disc pl-6 mt-2">
              <li>Comply with Meta and Google's terms of service and policies</li>
              <li>Grant us necessary permissions to access and analyze your ad accounts</li>
              <li>Maintain ownership and responsibility for your ad accounts</li>
              <li>Use the integration features in compliance with applicable advertising policies</li>
              <li>Not misuse or abuse the integration capabilities</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">5. AI-Powered Features</h2>
            <p>
              Our AI-powered suggestions and analysis features are provided "as is" and you acknowledge that:
            </p>
            <ul className="list-disc pl-6 mt-2">
              <li>AI suggestions are recommendations, not guarantees</li>
              <li>You maintain responsibility for your advertising decisions</li>
              <li>We do not guarantee specific results or outcomes</li>
              <li>AI analysis may not be suitable for all business cases</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">6. Disclaimer</h2>
            <p>
              The materials on Supa Chat Oasis are provided on an 'as is' basis. We make no warranties, expressed or
              implied, and hereby disclaim and negate all other warranties including, without limitation, implied
              warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of
              intellectual property or other violation of rights.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">7. Limitations</h2>
            <p>
              In no event shall Supa Chat Oasis or its suppliers be liable for any damages (including, without
              limitation, damages for loss of data or profit, or due to business interruption) arising out of the use
              or inability to use the materials on our website.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">8. Governing Law</h2>
            <p>
              These terms and conditions are governed by and construed in accordance with the laws, and you
              irrevocably submit to the exclusive jurisdiction of the courts in that location.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">9. Changes to Terms</h2>
            <p>
              We reserve the right to modify these terms of service at any time. We will notify users of any material
              changes by posting the new Terms of Service on this page and updating the "Last updated" date.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">10. Contact Information</h2>
            <p>
              If you have any questions about these Terms of Service, please contact us:
            </p>
            <ul className="list-disc pl-6 mt-2">
              <li>By email: [Your Contact Email]</li>
              <li>By visiting our website: {window.location.origin}</li>
            </ul>
          </section>
        </CardContent>
      </Card>
    </div>
  );
};

export default Terms; 