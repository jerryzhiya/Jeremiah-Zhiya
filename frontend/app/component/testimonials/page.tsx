import NextImage from 'next/image';

interface Testimonial {
  id: string;
  name: string;
  role: string;
  content: string;
  avatarUrl?: string;
  rating: number;
}

async function getTestimonials(): Promise<Testimonial[]> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/testimonials`, {
      cache: 'no-store',
    });
    if (!res.ok) return [];
    return res.json();
  } catch {
    return [];
  }
}

export default async function TestimonialsPage() {
  const testimonials = await getTestimonials();

  return (
    <section className="max-w-6xl mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold tracking-tight mb-4">Testimonials</h1>
        <p className="text-neutral-600 dark:text-neutral-400 max-w-xl mx-auto">
          Testimonials from clients
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {testimonials.map((item) => (
          <div
            key={item.id}
            className="p-6 rounded-2xl bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-sm hover:shadow-md transition flex flex-col justify-between"
          >
            <div>
              {/* Star Rating */}
              <div className="flex space-x-1 text-amber-400 mb-4">
                {Array.from({ length: item.rating }).map((_, i) => (
                  <span key={i}>★</span>
                ))}
              </div>
              <p className="text-neutral-700 dark:text-neutral-300 italic mb-6">
                &quot;{item.content}&quot;
              </p>
            </div>

            <div className="flex items-center space-x-4">
              {item.avatarUrl ? (
                <div className="w-12 h-12 relative rounded-full overflow-hidden border border-neutral-300 dark:border-neutral-700">
                  <NextImage
                    src={item.avatarUrl}
                    alt={item.name}
                    fill
                    className="object-cover"
                  />
                </div>
              ) : (
                <div className="w-12 h-12 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 font-bold flex items-center justify-center">
                  {item.name.charAt(0)}
                </div>
              )}
              <div>
                <h3 className="font-semibold text-neutral-900 dark:text-neutral-100">
                  {item.name}
                </h3>
                <p className="text-sm text-neutral-500 dark:text-neutral-400">
                  {item.role}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}