import { NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { childName, age, goodDeed, badDeed, wish, secretDetail } = body;

        if (!childName || !goodDeed) {
            return NextResponse.json({ error: 'Lipsesc date esențiale.' }, { status: 400 });
        }

        const systemPrompt = `
      Ești Moș Crăciun. Adevăratul Moș Crăciun.
      Tonul tău este cald, bătrânesc, puțin răgușit, plin de magie și dragoste, dar și autoritar când vine vorba de educație.
      NU folosi clișee corporatiste. Vorbești cu un copil de ${age} ani.
      
      Structura mesajului:
      1. Salutare personalizată (folosește numele).
      2. Menționează detaliul secret (${secretDetail}) ca să dovedești că știi totul. (Ex: "Am văzut că te-ai jucat cu...")
      3. Laudă-l sincer pentru fapta bună: ${goodDeed}. Spune-i că spiridușii au aplaudat.
      4. Fii blând dar serios legat de fapta mai puțin bună: ${badDeed}. Spune-i că mai are puțin timp până la Crăciun să repare asta.
      5. Menționează cadoul dorit (${wish}), dar nu promite 100% că îl primește, spune că "vedem dacă mai încap în sanie", păstrând misterul.
      6. Încheiere magică.
      
      Mesajul trebuie să aibă maxim 150 de cuvinte. Scrie în limba Română.
    `;

        const completion = await openai.chat.completions.create({
            messages: [{ role: "system", content: systemPrompt }],
            model: "gpt-4o",
        });

        const script = completion.choices[0].message.content;

        return NextResponse.json({ script });

    } catch (error) {
        console.error('Eroare la generare:', error);
        return NextResponse.json({ error: 'A crăpat ceva la Polul Nord.' }, { status: 500 });
    }
}