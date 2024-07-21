import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Footer() {
  const navigate = useNavigate()
  const [isHoveredPolicyPage, setIsHoveredPolicyPage] = useState(false)
  const [isHoveredCustomerPolicy, setIsHoveredCustomerPolicy] = useState(false)
  const [isHoveredRefundPolicy, setIsHoveredRefundPolicy] = useState(false)
  const [isHoveredShippingPolicy, setIsHoveredShippingPolicy] = useState(false)
  const [isHoveredFAQ, setIsHoveredFAQ] = useState(false)
  return (
    <div style={{
      backgroundColor: '#001529',
      color: '#fff',
      padding: '20px 0',
    }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-around',

        alignItems: 'center'
      }}>
        <div>
          <h1
            onClick={() => navigate('/policyPage')}
            onMouseEnter={() => setIsHoveredPolicyPage(true)}
            onMouseLeave={() => setIsHoveredPolicyPage(false)}
            style={{
              cursor: 'pointer',
              textDecoration: isHoveredPolicyPage ? 'underline' : 'none'
            }}
          >
            Policy Page
          </h1>
          <div>
            <ul>
              <li>
                <h5
                  onClick={() => navigate('/customerPolicy')}
                  onMouseEnter={() => setIsHoveredCustomerPolicy(true)}
                  onMouseLeave={() => setIsHoveredCustomerPolicy(false)}
                  style={{
                    cursor: 'pointer',
                    textDecoration: isHoveredCustomerPolicy ? 'underline' : 'none'
                  }}
                >
                  Customer Policy
                </h5>
              </li>
              <li>
                <h5
                  onClick={() => navigate('/refundPolicy')}
                  onMouseEnter={() => setIsHoveredRefundPolicy(true)}
                  onMouseLeave={() => setIsHoveredRefundPolicy(false)}
                  style={{
                    cursor: 'pointer',
                    textDecoration: isHoveredRefundPolicy ? 'underline' : 'none'
                  }}
                >
                  Refund Policy
                </h5>
              </li>
              <li>
                <h5
                  onClick={() => navigate('/shippingPolicy')}
                  onMouseEnter={() => setIsHoveredShippingPolicy(true)}
                  onMouseLeave={() => setIsHoveredShippingPolicy(false)}
                  style={{
                    cursor: 'pointer',
                    textDecoration: isHoveredShippingPolicy ? 'underline' : 'none'
                  }}
                >Shipping Policy</h5>
              </li>
              <li>
                <h5
                  onClick={() => navigate('/faq')}
                  onMouseEnter={() => setIsHoveredFAQ(true)}
                  onMouseLeave={() => setIsHoveredFAQ(false)}
                  style={{
                    cursor: 'pointer',
                    textDecoration: isHoveredFAQ ? 'underline' : 'none'
                  }}
                >
                  FAQ
                </h5>
              </li>
            </ul>
          </div>
        </div>
        <div>
          <div>
            <h5>Diamond Shop</h5>
          </div>
          <div>
            <h5>© {new Date().getFullYear()} Diamond Shop</h5>
          </div>
          <div>
            <h5>
              Lot E2a-7, Road D1, Long Thanh My, Thu Duc City, Ho Chi Minh City
            </h5>
          </div>
          <div>
            <h5>
              Phone: 012 3456789 - Fax: 012 3456789
            </h5>
          </div>
        </div>
      </div>
    </div>
  )
}
