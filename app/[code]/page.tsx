import { redirect } from 'next/navigation'
import { supabase } from '../../lib/supabase'

export default async function RedirectPage({
  params,
}: {
  params: Promise<{ code: string }>
}) {
  const { code } = await params

  const { data } = await supabase
    .from('links')
    .select('id, original_url, click_count')
    .eq('short_code', code)
    .single()

  if (!data) {
    redirect('/')
  }

  await supabase
    .from('links')
    .update({ click_count: (data.click_count || 0) + 1 })
    .eq('id', data.id)

  await supabase
    .from('clicks')
    .insert([{ link_id: data.id }])

  redirect(data.original_url)
}
