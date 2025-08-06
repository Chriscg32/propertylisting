import Link from 'next/link';

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="bg-teal-600 text-white p-2 rounded-lg">
                <i className="fas fa-home text-xl"></i>
              </div>
              <span className="text-2xl font-bold">PropertyListing</span>
            </div>
            <p className="text-gray-400 mb-4">AI-powered real estate listing platform for South African agents and sellers.</p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition"><i className="fab fa-facebook-f"></i></a>
              <a href="#" className="text-gray-400 hover:text-white transition"><i className="fab fa-twitter"></i></a>
              <a href="#" className="text-gray-400 hover:text-white transition"><i className="fab fa-instagram"></i></a>
              <a href="#" className="text-gray-400 hover:text-white transition"><i className="fab fa-linkedin-in"></i></a>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link href="/" className="text-gray-400 hover:text-white transition">Home</a></li>
              <li><Link href="/listings" className="text-gray-400 hover:text-white transition">Buy</a></li>
              <li><Link href="/listings?type=rent" className="text-gray-400 hover:text-white transition">Rent</a></li>
              <li><Link href="/listings?type=commercial" className="text-gray-400 hover:text-white transition">Commercial</a></li>
              <li><Link href="/agents" className="text-gray-400 hover:text-white transition">Agents</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Resources</h3>
            <ul className="space-y-2">
              <li><Link href="#" className="text-gray-400 hover:text-white transition">Blog</a></li>
              <li><Link href="#" className="text-gray-400 hover:text-white transition">Help Center</a></li>
              <li><Link href="#" className="text-gray-400 hover:text-white transition">Tutorials</a></li>
              <li><Link href="#" className="text-gray-400 hover:text-white transition">Pricing</a></li>
              <li><Link href="#" className="text-gray-400 hover:text-white transition">API</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-2 text-gray-400">
              <li className="flex items-start">
                <i className="fas fa-map-marker-alt mt-1 mr-2"></i>
                <span>123 Main Street, Sandton, Johannesburg</span>
              </li>
              <li className="flex items-center">
                <i className="fas fa-phone mr-2"></i>
                <span>+27 11 123 4567</span>
              </li>
              <li className="flex items-center">
                <i className="fas fa-envelope mr-2"></i>
                <span>info@propertylisting.co.za</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2025 PropertyListing. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}