import Button from '@/components/UI/Button';
import React from 'react';

const Index = () => {
    return (
        <div>
            <Button type="submit" title="Accepter Freelance" className="btn__secondary"/>
            <Button type="submit" title="Refuser Freelance" className="btn__primary"/>
        </div>
    );
}

export default Index;
