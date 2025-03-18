import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const Privacy = () => {
  return (
    <div className="container mx-auto py-8 px-4 max-w-4xl">
      <Card>
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-center">Privacy Policy</CardTitle>
          <p className="text-center text-muted-foreground">Last updated: {new Date().toLocaleDateString()}</p>
        </CardHeader>
        <CardContent className="prose prose-slate max-w-none">
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">1. Introduction</h2>
            <p>
              Welcome to Supa Chat Oasis. We respect your privacy and are committed to protecting your personal data.
              This privacy policy will inform you about how we look after your personal data when you visit our website
              and tell you about your privacy rights and how the law protects you.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">2. Data We Collect</h2>
            <p>We collect and process the following data when you use our services:</p>
            <ul className="list-disc pl-6 mt-2">
              <li>Identity Data (name, username, email address)</li>
              <li>Contact Data (email address, business address)</li>
              <li>Technical Data (IP address, browser type, device information)</li>
              <li>Profile Data (your preferences, feedback, and survey responses)</li>
              <li>Usage Data (how you use our website and services)</li>
              <li>Marketing Data (your preferences in receiving marketing from us)</li>
              <li>Ad Account Data (information from connected Meta and Google Ads accounts)</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">3. How We Use Your Data</h2>
            <p>We use your personal data for the following purposes:</p>
            <ul className="list-disc pl-6 mt-2">
              <li>To provide and maintain our service</li>
              <li>To analyze and optimize your ad campaigns</li>
              <li>To provide AI-powered suggestions and insights</li>
              <li>To notify you about changes to our service</li>
              <li>To provide customer support</li>
              <li>To gather analysis or valuable information to improve our service</li>
              <li>To detect, prevent and address technical issues</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">4. Data Sharing and Third Parties</h2>
            <p>
              We may share your personal data with the following third parties:
            </p>
            <ul className="list-disc pl-6 mt-2">
              <li>Meta (Facebook) for ad account integration</li>
              <li>Google for Google Ads integration</li>
              <li>OpenAI for AI-powered suggestions</li>
              <li>Supabase for data storage and authentication</li>
              <li>Vercel for hosting and deployment</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">5. Data Security</h2>
            <p>
              We have implemented appropriate security measures to prevent your personal data from being accidentally lost,
              used, or accessed in an unauthorized way. We limit access to your personal data to those employees, agents,
              contractors, and other third parties who have a business need to know.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">6. Your Rights</h2>
            <p>Under data protection laws, you have rights including:</p>
            <ul className="list-disc pl-6 mt-2">
              <li>The right to access your personal data</li>
              <li>The right to correct your personal data</li>
              <li>The right to erase your personal data</li>
              <li>The right to restrict processing of your personal data</li>
              <li>The right to object to processing of your personal data</li>
              <li>The right to data portability</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">7. Contact Us</h2>
            <p>
              If you have any questions about this Privacy Policy, you can contact us:
            </p>
            <ul className="list-disc pl-6 mt-2">
              <li>By email: [Your Contact Email]</li>
              <li>By visiting our website: {window.location.origin}</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">8. Changes to This Privacy Policy</h2>
            <p>
              We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new
              Privacy Policy on this page and updating the "Last updated" date at the top of this Privacy Policy.
            </p>
          </section>
        </CardContent>
      </Card>
    </div>
  );
};

export default Privacy; 