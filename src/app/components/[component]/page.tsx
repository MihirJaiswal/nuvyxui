import { Github, ExternalLink } from "lucide-react"
import { notFound } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ComponentSidebar } from "@/components/components/component-sidebar"
import { componentsData } from "@/nyxui/resgistry"
import Header from "@/components/global/Header"
import { PreviewCodeToggle } from "@/components/components/PreviewCodeToggle"
import { Badge } from "@/components/ui/badge"
import { InstallationSection } from "@/components/components/Installation"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import React from "react"
import { Card } from "@/components/ui/card"

const ComponentPage = async ({ params }: { params: Promise<{ component: string }>}) => {
  const component = (await params).component

  if (!componentsData) {
    console.error("componentsData is not properly loaded")
    notFound()
  }
  if (!(component in componentsData)) {
    console.error(`Component "${component}" not found in componentsData`)
    notFound()
  }

  const componentData = componentsData[component as keyof typeof componentsData]

  if (!componentData) {
    console.error(`Component data for "${component}" is undefined`)
    notFound()
  }

  if (!componentData.name || !componentData.description || !componentData.preview) {
    console.error(`Component "${component}" is missing required fields`)
    notFound()
  }

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <div className="container max-w-screen-2xl mx-auto flex-1 items-start md:grid md:grid-cols-[220px_minmax(0,1fr)] md:gap-8 lg:grid-cols-[280px_minmax(0,1fr)] xl:grid-cols-[300px_minmax(0,1fr)] lg:gap-12 bg-white dark:bg-zinc-950">
        <aside className="sticky top-16 self-start hidden md:block">
          <ComponentSidebar />
        </aside>
        <main className="relative py-8 lg:py-10 px-5 lg:px-8 xl:px-12 w-full">
          <div className="w-full max-w-5xl space-y-10">
            {/* Component Header Section */}
            <div className="space-y-4 border-b pb-8">
              <div className="flex flex-col md:flex-row md:items-center gap-3">
                <h1 className="scroll-m-20 text-4xl font-bold tracking-tight">
                  {componentData.name}
                </h1>
                <Badge variant="outline" className="font-medium">
                  UI Component
                </Badge>
              </div>
              <p className="md:text-xl text-lg text-muted-foreground leading-relaxed">
                {componentData.description}
              </p>
              <div className="flex gap-3 pt-2">
                <Button size="sm" variant="default">
                  <Github className="mr-2 size-4" />
                  View Source
                </Button>
                <Button size="sm" variant="outline">
                  <ExternalLink className="mr-2 size-4" />
                  Documentation
                </Button>
              </div>
            </div>

            {/* Preview Section */}
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-semibold tracking-tight">Preview</h2>
                <div className="flex items-center gap-2">
                  <Badge variant="secondary" className="font-medium">
                    Responsive
                  </Badge>
                  <Badge variant="secondary" className="font-medium">
                    Accessible
                  </Badge>
                </div>
              </div>
              <div className="rounded-xl border bg-white dark:bg-black backdrop-blur-sm overflow-hidden">
                <PreviewCodeToggle
                  preview={
                    <div className="flex flex-wrap justify-center gap-4 md:p-10">
                      {componentData.preview}
                    </div>
                  }
                  code={componentData.usage}
                />
              </div>
            </div>

            {/* Installation Section */}
            <InstallationSection componentData={componentData} />

            {/* Props Section */}
            <section className="space-y-8">
              <h2 className="text-3xl font-bold tracking-tight">Props</h2>
              {componentData.props && componentData.props.length > 0 ? (
                <Tabs defaultValue={componentData.props[0].name} className="w-full">
                  <TabsList className="mb-6 bg-zinc-100 dark:bg-zinc-800 p-0 shadow-sm">
                    {componentData.props.map((propGroup) => (
                      <TabsTrigger 
                        key={propGroup.name} 
                        value={propGroup.name}
                        className="px-8 py-3 text-base data-[state=active]:bg-white dark:data-[state=active]:bg-zinc-900"
                      >
                        {propGroup.name}
                      </TabsTrigger>
                    ))}
                  </TabsList>
                  
                  {componentData.props.map((propGroup) => (
                    <TabsContent key={propGroup.name} value={propGroup.name} className="space-y-4">
                      <div className="border shadow">
                        <table className="w-full border-collapse text-sm">
                          <thead>
                            <tr className="bg-zinc-50 dark:bg-black border-b">
                              <th className="px-6 py-4 text-left font-medium w-1/6 border-r">Name</th>
                              <th className="px-6 py-4 text-left font-medium w-1/6 border-r">Type</th>
                              <th className="px-6 py-4 text-left font-medium w-1/5 border-r">Default</th>
                              <th className="px-6 py-4 text-left font-medium w-3/6">Description</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y">
                            {propGroup.items.map((prop, index) => (
                              <React.Fragment key={prop.name}>
                                <tr 
                                  className={`transition-colors ${
                                    index % 2 === 0 
                                      ? 'bg-white dark:bg-black' 
                                      : 'bg-zinc-50 dark:bg-zinc-900'
                                  }`}
                                >
                                  <td className="px-6 py-4 font-mono text-sm font-semibold border-r">
                                    <code className="bg-yellow-50 dark:bg-zinc-800 px-2 py-1">{prop.name}</code>
                                  </td>
                                  <td className="px-6 py-4 font-mono text-sm border-r">
                                    <code className="bg-yellow-50 dark:bg-zinc-800 px-2 py-1">{prop.type}</code>
                                  </td>
                                  <td className="px-6 py-4 text-sm border-r">
                                    <code className="bg-yellow-50 dark:bg-zinc-800 px-2 py-1">{prop.default || "-"}</code>
                                  </td>
                                  <td className="px-6 py-4 text-sm">{prop.description}</td>
                                </tr>
                                {prop.subProps && prop.subProps.length > 0 && (
                                  <tr>
                                    <td colSpan={4} className="p-0">
                                      <div className="bg-zinc-50 dark:bg-zinc-900 border">
                                        <div className="px-4 py-2 font-medium text-sm bg-white dark:bg-black border-2 border-b">
                                          Properties of {prop.name}
                                        </div>
                                        <table className="w-full border-collapse text-sm">
                                          <tbody className="divide-y">
                                            {prop.subProps.map((subProp, subIndex) => (
                                              <tr 
                                                key={subProp.name}
                                                className={`transition-colors ${
                                                  subIndex % 2 === 0 
                                                    ? 'bg-white/50 dark:bg-black/30' 
                                                    : 'bg-zinc-50/70 dark:bg-zinc-900/70'
                                                }`}
                                              >
                                                <td className="pl-10 pr-6 py-3 font-mono text-sm font-medium border-r w-1/6">
                                                  <code className="bg-yellow-50 dark:bg-zinc-800 px-2 py-1">{subProp.name}</code>
                                                </td>
                                                <td className="px-6 py-3 font-mono text-sm border-r w-1/6">
                                                  <code className="bg-yellow-50 dark:bg-zinc-800 px-2 py-1">{subProp.type}</code>
                                                </td>
                                                <td className="px-6 py-3 text-sm border-r w-1/5">
                                                  <code className="bg-yellow-50 dark:bg-zinc-800 px-2 py-1">{subProp.default || "-"}</code>
                                                </td>
                                                <td className="px-6 py-3 text-sm w-3/6">{subProp.description}</td>
                                              </tr>
                                            ))}
                                          </tbody>
                                        </table>
                                      </div>
                                    </td>
                                  </tr>
                                )}
                              </React.Fragment>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </TabsContent>
                  ))}
                </Tabs>
              ) : (
                <Card className="border p-6 shadow">
                  <p className="text-zinc-500">No props available for this component.</p>
                </Card>
              )}
            </section>

            {/* Examples Section */}
            {componentData.examples && componentData.examples.length > 0 && (
              <div className="space-y-8">
                <h2 className="text-2xl font-semibold tracking-tight">Examples</h2>
                {componentData.examples.map((example) => (
                  <div key={example.name} className="space-y-4">
                    <div className="rounded-xl border overflow-hidden bg-white dark:bg-black">
                      <PreviewCodeToggle
                        preview={
                          <div className="flex flex-wrap justify-center gap-4 p-10">
                            {example.preview}
                          </div>
                        }
                        code={example.code}
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  )
}

export default ComponentPage