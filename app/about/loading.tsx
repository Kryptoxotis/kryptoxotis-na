export default function Loading() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="py-20 bg-zinc-900/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <div className="h-12 bg-zinc-800 rounded-sm mb-6 animate-pulse"></div>
            <div className="h-6 bg-zinc-800 rounded-sm animate-pulse"></div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="h-10 bg-zinc-800 rounded-sm mb-4 animate-pulse"></div>
              <div className="h-4 bg-zinc-800 rounded-sm mb-6 animate-pulse"></div>
              <div className="h-24 bg-zinc-800 rounded-sm animate-pulse"></div>
            </div>
            <div className="relative">
              <div className="cyber-border rounded-sm p-1 bg-black">
                <div className="aspect-video bg-zinc-800 rounded-sm animate-pulse"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values Section */}
      <section className="py-20 bg-zinc-900/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="h-10 bg-zinc-800 rounded-sm mb-4 mx-auto w-1/3 animate-pulse"></div>
          <div className="h-4 bg-zinc-800 rounded-sm mb-12 mx-auto w-1/2 animate-pulse"></div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            {[1, 2, 3].map((i) => (
              <div key={i} className="p-6 bg-zinc-900 rounded-sm cyber-border">
                <div className="h-16 w-16 bg-zinc-800 rounded-sm mb-4 mx-auto animate-pulse"></div>
                <div className="h-6 bg-zinc-800 rounded-sm mb-3 animate-pulse"></div>
                <div className="h-24 bg-zinc-800 rounded-sm animate-pulse"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="h-10 bg-zinc-800 rounded-sm mb-4 mx-auto w-1/3 animate-pulse"></div>
          <div className="h-4 bg-zinc-800 rounded-sm mb-12 mx-auto w-1/2 animate-pulse"></div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            {[1, 2, 3].map((i) => (
              <div key={i} className="relative rounded-sm bg-zinc-900 p-6 cyber-border animate-pulse">
                <div className="h-24 bg-zinc-800 mb-4"></div>
                <div className="flex items-center">
                  <div className="mr-4 h-10 w-10 rounded-full bg-zinc-800"></div>
                  <div>
                    <div className="h-4 w-24 bg-zinc-800 mb-2"></div>
                    <div className="h-3 w-16 bg-zinc-800"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-zinc-900/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="h-10 bg-zinc-800 rounded-sm mb-4 mx-auto w-1/3 animate-pulse"></div>
          <div className="h-4 bg-zinc-800 rounded-sm mb-12 mx-auto w-1/2 animate-pulse"></div>

          <div className="max-w-3xl mx-auto mt-12">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="border-b border-zinc-800 py-4 animate-pulse">
                <div className="flex justify-between items-center">
                  <div className="h-6 w-3/4 bg-zinc-800 rounded"></div>
                  <div className="h-5 w-5 bg-zinc-800 rounded"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
