import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Divider, Spacer, Image } from '@nextui-org/react';
import { supabase } from '@/utils/supabase';

const Test = () => {
 

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <Card className="max-w-lg w-full bg-white rounded-lg shadow-lg p-8 border border-gray-300">
     
        <div className="flex flex-col items-center">
          <h1 className="text-4xl font-serif text-gray-800 mb-4">Dear Violet,</h1>
          <Divider />
          <p className="text-gray-700 text-lg leading-relaxed mb-6 mt-6">
            I hope this letter finds you well. The days have been long and the nights longer since
            we last met. Your words have been my solace in these times of solitude.
          </p>
          <p className="text-gray-700 text-lg leading-relaxed mb-6">
            As the autumn leaves fall, I am reminded of our walks under the golden canopy. Your
            presence brought warmth to my life, much like the gentle touch of the morning sun.
          </p>
          <p className="text-gray-700 text-lg leading-relaxed mb-6">
            Until we meet again, I remain yours faithfully.
          </p>
          <p className="text-gray-700 text-lg leading-relaxed mb-6 text-right">
            With love,<br />
            Gilbert
          </p>
          <Spacer y={1} />
          <Button className="mt-6">Send Reply</Button>
        </div>
      </Card>
    </div>
  );
};

export default Test;
