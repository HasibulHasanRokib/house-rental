import { Facebook, Twitter, Instagram, Github, Youtube } from "lucide-react";

interface SocialMediaProps {
  facebook?: string;
  twitter?: string;
  instagram?: string;
  github?: string;
  youtube?: string;
}

export default function SocialMediaLists({
  facebook = "#",
  twitter = "#",
  instagram = "#",
  github = "#",
  youtube = "#",
}: SocialMediaProps) {
  return (
    <div className="w-full bg-white p-4 mt-2">
      <h2 className="text-2xl font-semibold mb-4 font-sans">Social Media</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
        <a
          href={facebook}
          className="flex items-center justify-center p-2 bg-[#1877f2] rounded-lg hover:opacity-90 transition-opacity"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Facebook className="w-6 h-6 text-white" />
          <span className="sr-only">Facebook</span>
        </a>
        <a
          href={twitter}
          className="flex items-center justify-center p-2 bg-[#1da1f2] rounded-lg hover:opacity-90 transition-opacity"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Twitter className="w-6 h-6 text-white" />
          <span className="sr-only">Twitter</span>
        </a>
        <a
          href={instagram}
          className="flex items-center justify-center p-2 bg-[#e4405f] rounded-lg hover:opacity-90 transition-opacity"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Instagram className="w-6 h-6 text-white" />
          <span className="sr-only">Instagram</span>
        </a>
        <a
          href={github}
          className="flex items-center justify-center p-2 bg-black rounded-lg hover:opacity-90 transition-opacity"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Github className="w-6 h-6 text-white" />
          <span className="sr-only">GitHub</span>
        </a>
        <a
          href={youtube}
          className="flex items-center justify-center p-2 bg-[#ff0000] rounded-lg hover:opacity-90 transition-opacity"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Youtube className="w-6 h-6 text-white" />
          <span className="sr-only">YouTube</span>
        </a>
      </div>
    </div>
  );
}
