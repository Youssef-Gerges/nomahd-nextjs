import React, {useEffect, useState} from "react";

export default function DeliveryReturn() {
    const [content, setContent] = useState('');

    useEffect(() => {
        const fetchContent = async () => {
            try {
                const response = await fetch('https://nomahd.com/size-charts-show/1');
                const text = await response.text();
                setContent(text);
            } catch (error) {
                console.error('Error fetching content:', error);
            }
        };

        fetchContent();
    }, []);
  return (
    <div
      className="modal modalCentered fade modalDemo tf-product-modal modal-part-content"
      id="delivery_return"
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="header">
            <div className="demo-title">Size Chart</div>
            <span
              className="icon-close icon-close-popup"
              data-bs-dismiss="modal"
            />
          </div>
          <div className="overflow-y-auto">
            <div dangerouslySetInnerHTML={{
                __html: content
            }}></div>
          </div>
        </div>
      </div>
    </div>
  );
}
